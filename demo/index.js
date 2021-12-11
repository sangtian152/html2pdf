import html2pdf from 'src/index'

function* gen(){
    yield 1;
    yield 2;
    yield 3;
}
document.getElementById('create').onclick = function(){
    let html = ''
    for(let i = 0; i < 100; i++) {
        html += '<tr><td>1111</td><td>1111</td><td>1111</td></tr>'
    }
    document.getElementById('table').innerHTML = html
}
document.getElementById('print').onclick = function(){
    const table = document.getElementById('table')
    html2pdf(table, {
        background: '#aadddd',
        minimumUnit: 'tr'
    })
}
const g = gen();
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())