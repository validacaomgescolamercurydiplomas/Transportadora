
/* Adiciona caixa alta automaticamente sem alterar as outras funções */
document.addEventListener('input', function(e){
    if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA'){
        if(e.target.type !== 'date' && e.target.type !== 'number'){
            e.target.value = e.target.value.toUpperCase();
        }
    }
});
