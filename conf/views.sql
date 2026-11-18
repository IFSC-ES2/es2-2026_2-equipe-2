--Consultas
-- Produtos com estoque no nível mínimo ou abaixo
CREATE OR REPLACE VIEW vw_estoque_baixo AS
SELECT id, sku, nome, quantidade, estoque_minimo,
       (estoque_minimo - quantidade) AS faltam_para_o_minimo
FROM produtos
WHERE quantidade <= estoque_minimo
ORDER BY (quantidade - estoque_minimo), nome;

-- 5 produtos com maior estoque
CREATE OR REPLACE VIEW vw_maiores_estoques AS
SELECT id, sku, nome, quantidade, estoque_minimo
FROM produtos
ORDER BY quantidade DESC, nome
    LIMIT 5;


-- Produto do mais vendido para o menos ultimos 30 dias
CREATE OR REPLACE VIEW vw_produtos_vendidos_30d AS
SELECT pr.id, pr.sku, pr.nome,
       SUM(ip.quantidade)::int                        AS unidades_vendidas,
    SUM(ip.quantidade * ip.preco_unitario)::float8 AS receita
FROM itens_pedido ip
         JOIN pedidos  p  ON p.id  = ip.pedido_id AND p.status = 'CONCLUIDO'
         JOIN produtos pr ON pr.id = ip.produto_id
WHERE p.data_pedido >= NOW() - INTERVAL '30 days'
GROUP BY pr.id, pr.sku, pr.nome
ORDER BY unidades_vendidas DESC, receita DESC, pr.id;

-- Produto do mais vendido para o menos ultimos 90 dias
CREATE OR REPLACE VIEW vw_produtos_vendidos_90d AS
SELECT pr.id, pr.sku, pr.nome,
       SUM(ip.quantidade)::int                        AS unidades_vendidas,
    SUM(ip.quantidade * ip.preco_unitario)::float8 AS receita
FROM itens_pedido ip
         JOIN pedidos  p  ON p.id  = ip.pedido_id AND p.status = 'CONCLUIDO'
         JOIN produtos pr ON pr.id = ip.produto_id
WHERE p.data_pedido >= NOW() - INTERVAL '90 days'
GROUP BY pr.id, pr.sku, pr.nome
ORDER BY unidades_vendidas DESC, receita DESC, pr.id;

-- Produto do mais vendido para o menos ultimos 365 dias
CREATE OR REPLACE VIEW vw_produtos_vendidos_365d AS
SELECT pr.id, pr.sku, pr.nome,
       SUM(ip.quantidade)::int                        AS unidades_vendidas,
    SUM(ip.quantidade * ip.preco_unitario)::float8 AS receita
FROM itens_pedido ip
         JOIN pedidos  p  ON p.id  = ip.pedido_id AND p.status = 'CONCLUIDO'
         JOIN produtos pr ON pr.id = ip.produto_id
WHERE p.data_pedido >= NOW() - INTERVAL '365 days'
GROUP BY pr.id, pr.sku, pr.nome
ORDER BY unidades_vendidas DESC, receita DESC, pr.id;

-- Categoria da mais vendida a menos ultimos 30 dias
CREATE OR REPLACE VIEW vw_categorias_vendidas_30d AS
SELECT c.id, c.nome,
       SUM(ip.quantidade)::int                        AS unidades_vendidas,
    SUM(ip.quantidade * ip.preco_unitario)::float8 AS receita
FROM itens_pedido ip
         JOIN pedidos    p  ON p.id  = ip.pedido_id AND p.status = 'CONCLUIDO'
         JOIN produtos   pr ON pr.id = ip.produto_id
         JOIN categorias c  ON c.id  = pr.categoria_id
WHERE p.data_pedido >= NOW() - INTERVAL '30 days'
GROUP BY c.id, c.nome
ORDER BY unidades_vendidas DESC, receita DESC, c.id;

-- Categoria da mais vendida a menos 90 dias
CREATE OR REPLACE VIEW vw_categorias_vendidas_90d AS
SELECT c.id, c.nome,
       SUM(ip.quantidade)::int                        AS unidades_vendidas,
    SUM(ip.quantidade * ip.preco_unitario)::float8 AS receita
FROM itens_pedido ip
         JOIN pedidos    p  ON p.id  = ip.pedido_id AND p.status = 'CONCLUIDO'
         JOIN produtos   pr ON pr.id = ip.produto_id
         JOIN categorias c  ON c.id  = pr.categoria_id
WHERE p.data_pedido >= NOW() - INTERVAL '90 days'
GROUP BY c.id, c.nome
ORDER BY unidades_vendidas DESC, receita DESC, c.id;

-- Categoria da mais vendida a menos 365 dias
CREATE OR REPLACE VIEW vw_categorias_vendidas_365d AS
SELECT c.id, c.nome,
       SUM(ip.quantidade)::int                        AS unidades_vendidas,
    SUM(ip.quantidade * ip.preco_unitario)::float8 AS receita
FROM itens_pedido ip
         JOIN pedidos    p  ON p.id  = ip.pedido_id AND p.status = 'CONCLUIDO'
         JOIN produtos   pr ON pr.id = ip.produto_id
         JOIN categorias c  ON c.id  = pr.categoria_id
WHERE p.data_pedido >= NOW() - INTERVAL '365 days'
GROUP BY c.id, c.nome
ORDER BY unidades_vendidas DESC, receita DESC, c.id;

-- Total de produtos e ganho ultimos 30 dias
CREATE OR REPLACE VIEW vw_resumo_vendas_30d AS
SELECT COALESCE(SUM(ip.quantidade), 0)::int                        AS total_produtos_vendidos,
    COALESCE(SUM(ip.quantidade * ip.preco_unitario), 0)::float8 AS ganhos_totais,
    COUNT(DISTINCT p.id)::int                                   AS total_vendas
FROM pedidos p
         LEFT JOIN itens_pedido ip ON ip.pedido_id = p.id
WHERE p.status = 'CONCLUIDO'
  AND p.data_pedido >= NOW() - INTERVAL '30 days';

-- Total de produtos e ganho ultimos 90 dias
CREATE OR REPLACE VIEW vw_resumo_vendas_90d AS
SELECT COALESCE(SUM(ip.quantidade), 0)::int                        AS total_produtos_vendidos,
    COALESCE(SUM(ip.quantidade * ip.preco_unitario), 0)::float8 AS ganhos_totais,
    COUNT(DISTINCT p.id)::int                                   AS total_vendas
FROM pedidos p
         LEFT JOIN itens_pedido ip ON ip.pedido_id = p.id
WHERE p.status = 'CONCLUIDO'
  AND p.data_pedido >= NOW() - INTERVAL '90 days';

-- Total de produtos e ganho ultimos 365 dias
CREATE OR REPLACE VIEW vw_resumo_vendas_365d AS
SELECT COALESCE(SUM(ip.quantidade), 0)::int                        AS total_produtos_vendidos,
    COALESCE(SUM(ip.quantidade * ip.preco_unitario), 0)::float8 AS ganhos_totais,
    COUNT(DISTINCT p.id)::int                                   AS total_vendas
FROM pedidos p
         LEFT JOIN itens_pedido ip ON ip.pedido_id = p.id
WHERE p.status = 'CONCLUIDO'
  AND p.data_pedido >= NOW() - INTERVAL '365 days';