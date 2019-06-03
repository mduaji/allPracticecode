var update = document.getElementById('update')

var id = document.getElementById('id');
var name = document.getElementById('name');
update.addEventListener('click', () => {
    fetch('std_tbl', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'id':id,
            'name': name
        })
    })
})