import { useState } from "react";
import './ProdutoForm.css';

export function ProdutoForm({ onAdicionarProduto }){
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nome.trim() || !preco || !descricao.trim()){
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        const novoProduto = {
            id: Date.now(),
            nome,
            preco: parseFloat(preco),
            descricao,
            imagem: imagem.trim() ||  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=60'
        };

        onAdicionarProduto(novoProduto);

        //limpeza de bloco
        setNome('');
        setPreco('');
        setDescricao('');
        setImagem('');
    };

    //codigo html
    return(
        <form className="produto-form" onSubmit={handleSubmit}>
            <h2>Cadastrar Novo Produto</h2>

            <div className="form-group">
                <label htmlFor="nome">Nome do Produto *</label>
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Mouse Gamer"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="preco">Preço (R$) *</label>
                <input 
                    type="number"
                    id="preco"
                    step="0.01"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    placeholder="Ex: 150.00"
                    required
                />
            </div>

            <div className="form-group">
                <label className="descricao">Descrição *</label>
                <textarea
                    id="descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Breve descrição sobre o produto..."
                    rows="3"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="imagem">URL da Imagem (Opcional)</label>
                <input
                    type="url"
                    id="imagem"
                    value={imagem}
                    onChange={(e) => setImagem(e.target.value)}
                    placeholder="https://exemplo.com/imagem.jpg"                
                />
            </div>

            <button type="submit" className="btn-submit">Adicionar Produto</button>

        </form>
    );
}