import './ProdutoCard.css';

export function ProdutoCard({ nome, preco, descricao, imagem}){
    const precoFormatado = Number(preco).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    return(
        <div className='produto-card'>
            <img src={imagem || "https://via.placeholder.com/300"} alt={nome} className='produto-imagem'/>
            <div className='produto-info'>
                <h3 className='produto-nome'>{nome}</h3>
                <p className='produto-descricao'>{descricao}</p>
                <span className='produto-preco'>{precoFormatado}</span>
            </div>

        </div>
    );
}