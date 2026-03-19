import bs4

with open('maker-passport-template.html', 'r') as f:
    soup = bs4.BeautifulSoup(f, 'html.parser')

pages = soup.find_all('div', class_='page')
pages_container = bs4.Tag(name='div')
pages_container['id'] = 'pages-container'
pages_container['style'] = 'display: none;'

for p in pages:
    import copy
    pages_container.append(copy.copy(p))
    p.extract()

print_layout = bs4.Tag(name='div')
print_layout['id'] = 'print-layout'

controls = soup.find('div', class_='print-controls')
if controls:
    controls.clear()

    btn = bs4.Tag(name='button')
    btn['class'] = ['print-btn']
    btn['onclick'] = 'window.print()'
    btn.string = 'Print Passport'

    select = bs4.Tag(name='select')
    select['id'] = 'layout-mode'
    select['onchange'] = 'applyImposition()'
    select['style'] = 'padding: 0.5rem; font-family: inherit; font-size: 14px; border-radius: 4px; border: none; margin-left: 1rem; cursor: pointer;'

    opt_cut = bs4.Tag(name='option')
    opt_cut['value'] = 'cut-stack'
    opt_cut.string = 'Cut & Stack Layout'

    opt_saddle = bs4.Tag(name='option')
    opt_saddle['value'] = 'saddle-stitch'
    opt_saddle.string = 'Saddle Stitch Layout'

    select.append(opt_cut)
    select.append(opt_saddle)

    help_span = bs4.Tag(name='span')
    help_span['class'] = ['print-help']
    help_span['id'] = 'print-help-text'
    help_span['style'] = 'margin-left: 1rem;'
    help_span.string = ''

    controls.append(btn)
    controls.append(select)
    controls.append(help_span)

soup.body.append(pages_container)
soup.body.append(print_layout)

js_code = """
<script>
function applyImposition() {
    const container = document.getElementById('pages-container');
    const layout = document.getElementById('print-layout');
    const mode = document.getElementById('layout-mode').value;
    const helpText = document.getElementById('print-help-text');

    layout.innerHTML = '';

    const originalPages = Array.from(container.children).map(p => {
        let clone = p.cloneNode(true);
        return {
            html: clone.innerHTML,
            isDotGrid: clone.classList.contains('dot-grid')
        };
    });

    while (originalPages.length % 4 !== 0) {
        originalPages.push({
            html: '<div style="display:flex; height:100%; width:100%; align-items:center; justify-content:center; opacity:0.3; font-weight:bold; font-size: 24px;">[ BLANK PAGE ]</div>',
            isDotGrid: true
        });
    }

    const N = originalPages.length;
    const spreads = [];

    if (mode === 'saddle-stitch') {
        helpText.innerText = 'For saddle stitch: Print double-sided (flip on short edge). Stack, fold in half, and staple on the fold.';
        for (let i = 0; i < N / 4; i++) {
            spreads.push([ originalPages[N - 1 - 2*i], originalPages[0 + 2*i] ]);
            spreads.push([ originalPages[1 + 2*i], originalPages[N - 2 - 2*i] ]);
        }
    } else if (mode === 'cut-stack') {
        helpText.innerText = 'For cut & stack: Print double-sided (flip on short edge). Cut in half horizontally, stack right pile on top of left pile, and bind left edge.';
        const half = N / 2;
        for (let i = 0; i < N / 4; i++) {
            spreads.push([ originalPages[2*i], originalPages[half + 2*i] ]);
            spreads.push([ originalPages[2*i + 1], originalPages[half + 2*i + 1] ]);
        }
    }

    spreads.forEach(pair => {
        const spreadDiv = document.createElement('div');
        spreadDiv.className = 'spread';

        pair.forEach(page => {
            const halfDiv = document.createElement('div');
            halfDiv.className = 'page-half';

            if (page.isDotGrid) {
                halfDiv.classList.add('dot-grid');
            }

            halfDiv.innerHTML = page.html;
            spreadDiv.appendChild(halfDiv);
        });

        layout.appendChild(spreadDiv);
    });
}

document.addEventListener('DOMContentLoaded', applyImposition);
</script>
"""
soup.body.append(bs4.BeautifulSoup(js_code, 'html.parser'))

css_text = soup.style.string

import re
css_text = re.sub(r'\s*\.page\s*\{[^}]*\}', '', css_text, flags=re.DOTALL)
css_text = re.sub(r'\s*@page\s*\{[^}]*\}', '', css_text, flags=re.DOTALL)
css_text = re.sub(r'\s*@media\s*print\s*\{.*?\}\s*(?=</style>|$)', '', css_text, flags=re.DOTALL)

new_css = """
        .spread {
            display: flex;
            width: 11in;
            height: 8.5in;
            margin: 0 auto;
            background-color: var(--bg-color);
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
            position: relative;
            box-sizing: border-box;
            page-break-after: always;
            page-break-inside: avoid;
        }

        .spread::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
            border-left: 1px dashed rgba(0,0,0,0.15);
            z-index: 10;
            pointer-events: none;
        }

        .page-half {
            width: 50%;
            height: 100%;
            padding: 0.5in;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
        }

        body {
            padding-top: 5rem;
            background-color: #f3f4f6;
        }

        @media print {
            .print-controls {
                display: none !important;
            }

            @page {
                size: 11in 8.5in;
                margin: 0;
            }
            body {
                background-color: transparent;
                padding: 0;
                display: block;
            }
            .spread {
                box-shadow: none;
                margin: 0;
                page-break-after: always;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .spread::after {
                border-left: 1px dashed rgba(0,0,0,0.3);
            }
            .dot-grid {
                background-image: radial-gradient(grey 1px, transparent 1px) !important;
            }
            #pages-container {
                display: none !important;
            }
        }
"""
soup.style.string = css_text + new_css

with open('maker-passport-template.html', 'w') as f:
    f.write(str(soup))
