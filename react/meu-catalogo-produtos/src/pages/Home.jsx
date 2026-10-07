import { useState, useEffect } from "react";
import { ProdutoCard } from '../components/ProdutoCard';
import { ProdutoForm } from "../components/ProdutoForm";
import { produtosIniciais } from "../data/produtosMock";

export function Home(){
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setProdutos(produtosIniciais);
            setCarregando(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handleAdicionarProduto = (novoProduto) => {
        setProdutos((prevProdutos) => [novoProduto, ...prevProdutos]);
    };

    //codigo em html 
    return(
        <div className="home-container">
            <header className="home-header">
                <h2>Catálogo de Produtos</h2>
                <p>Gerencie seu estoque de forma simples e rápida</p>
            </header>

            <main className="home-content">
                <section className="form-section">
                    <ProdutoForm onAdicionarProduto={handleAdicionarProduto} />
                </section>

                <section className="catalogo-section">
                    <h2>Produtos Disponíveis</h2>

                    {carregando ? (
                        <div className="loading-state">
                            <p>Carregando produtos...</p>
                        </div>
                    ) : produtos.length === 0 ? (
                        <p className="empty-state">Nunhem produto cadastrado no momento</p>
                    ) : (
                        <div className="produtos-grid">
                            {produtos.map((produto) =>(
                                <ProdutoCard
                                    key={produto.id}
                                    nome={produto.nome}
                                    preco={produto.preco}
                                    descricao={produto.descricao}
                                    imagem={produto.imagem}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}