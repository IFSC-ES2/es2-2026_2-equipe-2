-- AQUI VÃO OS ARQUIVOS PARA GERAR AS TABELAS DO BANCO
--Tipos
CREATE TYPE status_pedido AS ENUM ('PENDENTE', 'CONCLUIDO', 'CANCELADO');
CREATE TYPE tipo_movimentacao AS ENUM ('ENTRADA', 'SAIDA');
-- Clientes
CREATE TABLE clientes (
    id              SERIAL PRIMARY KEY,
    nome            VARCHAR(150) NOT NULL,
    email           VARCHAR(150) NOT NULL UNIQUE,
    telefone        VARCHAR(20),
    documento       VARCHAR(20) UNIQUE,      -- CPF/CNPJ
    endereco        VARCHAR(255),
    criado_em       TIMESTAMP NOT NULL DEFAULT NOW()
);
-- Categorias de produtos
CREATE TABLE categorias (
    id              SERIAL PRIMARY KEY,
    nome            VARCHAR(100) NOT NULL UNIQUE
);
-- Fornecedores
CREATE TABLE fornecedores (
    id              SERIAL PRIMARY KEY,
    nome            VARCHAR(150) NOT NULL,
    cnpj            VARCHAR(20) UNIQUE,
    telefone        VARCHAR(20),
    email           VARCHAR(150)
);
-- Produtos
CREATE TABLE produtos (
    id              SERIAL PRIMARY KEY,
    sku             VARCHAR(50) NOT NULL UNIQUE,
    nome            VARCHAR(150) NOT NULL,
    descricao       TEXT,
    categoria_id    INTEGER REFERENCES categorias(id) ON DELETE SET NULL,
    fornecedor_id   INTEGER REFERENCES fornecedores(id) ON DELETE SET NULL,
    preco           NUMERIC(10,2) NOT NULL CHECK (preco >= 0),
    quantidade      INTEGER NOT NULL DEFAULT 0 CHECK (quantidade >= 0),
    estoque_minimo  INTEGER NOT NULL DEFAULT 0,
    criado_em       TIMESTAMP NOT NULL DEFAULT NOW(),
    atualizado_em   TIMESTAMP NOT NULL DEFAULT NOW()
);
-- Pedidos
CREATE TABLE pedidos (
    id              SERIAL PRIMARY KEY,
    cliente_id      INTEGER NOT NULL REFERENCES clientes(id) ON DELETE RESTRICT,
    status          status_pedido NOT NULL DEFAULT 'PENDENTE',
    data_pedido     TIMESTAMP NOT NULL DEFAULT NOW(),
    valor_total     NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (valor_total >= 0)
);
-- Itens do pedido
CREATE TABLE itens_pedido (
    id              SERIAL PRIMARY KEY,
    pedido_id       INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    produto_id      INTEGER NOT NULL REFERENCES produtos(id) ON DELETE RESTRICT,
    quantidade      INTEGER NOT NULL CHECK (quantidade > 0),
    preco_unitario  NUMERIC(10,2) NOT NULL CHECK (preco_unitario >= 0),
    UNIQUE (pedido_id, produto_id)
);
-- Movimentações de estoque (histórico de entradas/saídas)
CREATE TABLE movimentacoes_estoque (
    id              SERIAL PRIMARY KEY,
    produto_id      INTEGER NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
    tipo            tipo_movimentacao NOT NULL, --entrada ou saída
    quantidade      INTEGER NOT NULL CHECK (quantidade > 0),
    referencia      VARCHAR(150),   -- ex: "Pedido #123" ou "Compra fornecedor X"
    criado_em       TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =========================================================
-- DADOS INICIAIS (SEED)
-- =========================================================
-- Categorias
INSERT INTO categorias (nome) VALUES
    ('Eletrônicos'),
    ('Informática'),
    ('Papelaria'),
    ('Móveis'),
    ('Alimentos'),
    ('Áudio'),
    ('Acessórios');

-- Fornecedores
INSERT INTO fornecedores (nome, cnpj, telefone, email) VALUES
    ('Tech Distribuidora Ltda', '12.345.678/0001-90', '(11) 4002-8922', 'contato@techdist.com.br'),
    ('Papelaria Central Ltda', '98.765.432/0001-10', '(11) 3555-1234', 'vendas@papelariacentral.com.br'),
    ('Móveis & Cia', '11.222.333/0001-44', '(11) 2233-4455', 'comercial@moveisecia.com.br'),
    ('Som & Vida Distribuição', '33.444.555/0001-88', '(11) 3100-9090', 'contato@somevida.com.br');

-- Clientes
INSERT INTO clientes (nome, email, telefone, documento, endereco) VALUES
    ('Maria Silva', 'maria.silva@email.com', '(11) 98888-1111', '123.456.789-00', 'Rua das Flores, 100 - São Paulo/SP'),
    ('João Pereira', 'joao.pereira@email.com', '(11) 97777-2222', '987.654.321-00', 'Av. Paulista, 200 - São Paulo/SP'),
    ('Empresa ABC Ltda', 'contato@empresaabc.com.br', '(11) 96666-3333', '45.678.912/0001-33', 'Rua Comercial, 300 - São Paulo/SP'),
    ('Pet Shop Amigo Fiel', 'contato@amigofiel.com.br', '(48) 3222-1100', '22.333.444/0001-55', 'Av. Central, 550 - Florianópolis/SC'),
    ('Farmácia Popular Centro', 'farmacia@popularcentro.com.br', '(48) 3333-4400', '33.444.555/0001-66', 'Rua Felipe Schmidt, 120 - Florianópolis/SC'),
    ('Oficina Rápido Auto', 'contato@rapidoauto.com.br', '(48) 3444-5500', '44.555.666/0001-77', 'Rua das Oficinas, 400 - São José/SC'),
    ('Consumidor Final', 'consumidor@final.com.br', '(48) 99999-0000', '111.222.333-44', 'Balcão da Loja');

-- Produtos
INSERT INTO produtos (sku, nome, descricao, categoria_id, fornecedor_id, preco, quantidade, estoque_minimo) VALUES
    ('ELE-0001', 'Smartphone XPTO 128GB', 'Smartphone com 128GB de armazenamento e câmera tripla', 1, 1, 1899.90, 25, 5),
    ('INF-0001', 'Notebook Ultra 15"', 'Notebook 15 polegadas, 16GB RAM, SSD 512GB', 2, 1, 4599.00, 10, 3),
    ('PAP-0001', 'Caderno Universitário 200 fls', 'Caderno espiral capa dura', 3, 2, 24.90, 150, 20),
    ('PAP-0002', 'Caneta Esferográfica Azul', 'Caixa com 50 unidades', 3, 2, 39.90, 80, 10),
    ('MOV-0001', 'Cadeira de Escritório Ergonômica', 'Cadeira com apoio lombar ajustável', 4, 3, 749.00, 15, 4),
    ('AUD-0001', 'Caixa de Som JBL Go 3', 'Caixa de som bluetooth portátil à prova d água', 6, 4, 215.50, 45, 5),
    ('ELE-0002', 'Power Bank 10000mAh', 'Carregador portátil rápido', 7, 1, 127.25, 60, 10),
    ('INF-0002', 'Cartão microSD SanDisk 128GB', 'Cartão de memória ultra rápido classe 10', 2, 1, 68.28, 90, 15),
    ('AUD-0002', 'Fone Bluetooth TWS i12', 'Fone de ouvido sem fio intra-auricular', 6, 4, 75.49, 70, 10),
    ('ELE-0003', 'Pilha Alcalina AA c/ 4', 'Cartela com 4 pilhas alcalinas de longa duração', 7, 2, 23.05, 120, 25),
    ('INF-0003', 'Webcam Logitech C270 HD', 'Webcam HD 720p com microfone integrado', 2, 1, 199.90, 35, 5);

-- Pedidos (Diversas vendas com datas variadas para enriquecer o gráfico e a tabela de demonstração)
INSERT INTO pedidos (id, cliente_id, status, data_pedido, valor_total) VALUES
    (1, 1, 'CONCLUIDO', NOW() - INTERVAL '30 days', 1899.90),
    (2, 2, 'CONCLUIDO', NOW() - INTERVAL '25 days', 4623.90),
    (3, 3, 'CANCELADO', NOW() - INTERVAL '20 days', 74.80),
    (4, 4, 'CONCLUIDO', NOW() - INTERVAL '14 days', 646.50),
    (5, 5, 'CONCLUIDO', NOW() - INTERVAL '12 days', 92.20),
    (6, 7, 'CONCLUIDO', NOW() - INTERVAL '10 days', 254.50),
    (7, 6, 'CONCLUIDO', NOW() - INTERVAL '8 days', 273.12),
    (8, 6, 'CONCLUIDO', NOW() - INTERVAL '6 days', 377.45),
    (9, 5, 'CONCLUIDO', NOW() - INTERVAL '5 days', 92.20),
    (10, 4, 'CONCLUIDO', NOW() - INTERVAL '4 days', 1293.00),
    (11, 2, 'CONCLUIDO', NOW() - INTERVAL '3 days', 4599.00),
    (12, 1, 'CONCLUIDO', NOW() - INTERVAL '2 days', 599.70),
    (13, 7, 'PENDENTE',  NOW() - INTERVAL '1 day',  254.50),
    (14, 4, 'CONCLUIDO', NOW() - INTERVAL '4 hours', 431.00),
    (15, 3, 'CONCLUIDO', NOW() - INTERVAL '1 hour',  2247.00);

-- Ajusta a sequência da tabela pedidos para continuar após o id 15
SELECT setval('pedidos_id_seq', (SELECT MAX(id) FROM pedidos));

-- Itens dos pedidos
INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES
    -- Pedido 1
    (1, 1, 1, 1899.90),
    -- Pedido 2
    (2, 2, 1, 4599.00),
    (2, 3, 1, 24.90),
    -- Pedido 3 (Cancelado)
    (3, 4, 2, 37.40),
    -- Pedido 4 (Pet Shop Amigo Fiel: Caixa JBL)
    (4, 6, 3, 215.50),
    -- Pedido 5 (Farmácia Popular Centro: Pilhas)
    (5, 10, 4, 23.05),
    -- Pedido 6 (Consumidor final: Power Bank)
    (6, 7, 2, 127.25),
    -- Pedido 7 (Oficina Rápido Auto: Cartão microSD)
    (7, 8, 4, 68.28),
    -- Pedido 8 (Oficina Rápido Auto: Fones Bluetooth)
    (8, 9, 5, 75.49),
    -- Pedido 9 (Farmácia Popular Centro: Pilhas)
    (9, 10, 4, 23.05),
    -- Pedido 10 (Pet Shop: 6 Caixas JBL)
    (10, 6, 6, 215.50),
    -- Pedido 11 (Notebook)
    (11, 2, 1, 4599.00),
    -- Pedido 12 (Webcam Logitech)
    (12, 11, 3, 199.90),
    -- Pedido 13 (Power Bank)
    (13, 7, 2, 127.25),
    -- Pedido 14 (Caixa JBL)
    (14, 6, 2, 215.50),
    -- Pedido 15 (Cadeiras de Escritório)
    (15, 5, 3, 749.00);

-- Movimentações de estoque correspondentes
INSERT INTO movimentacoes_estoque (produto_id, tipo, quantidade, referencia) VALUES
    (1, 'ENTRADA', 30, 'Compra fornecedor Tech Distribuidora'),
    (1, 'SAIDA', 1, 'Pedido #1'),
    (2, 'ENTRADA', 12, 'Compra fornecedor Tech Distribuidora'),
    (2, 'SAIDA', 1, 'Pedido #2'),
    (3, 'ENTRADA', 170, 'Compra fornecedor Papelaria Central'),
    (3, 'SAIDA', 1, 'Pedido #2'),
    (4, 'ENTRADA', 90, 'Compra fornecedor Papelaria Central'),
    (4, 'SAIDA', 2, 'Pedido #3 (cancelado)'),
    (6, 'ENTRADA', 50, 'Compra fornecedor Som & Vida'),
    (6, 'SAIDA', 3, 'Pedido #4'),
    (7, 'ENTRADA', 80, 'Compra fornecedor Tech Distribuidora'),
    (7, 'SAIDA', 2, 'Pedido #6'),
    (8, 'ENTRADA', 100, 'Compra fornecedor Tech Distribuidora'),
    (8, 'SAIDA', 4, 'Pedido #7'),
    (9, 'ENTRADA', 80, 'Compra fornecedor Som & Vida'),
    (9, 'SAIDA', 5, 'Pedido #8'),
    (10, 'ENTRADA', 150, 'Compra fornecedor Papelaria Central'),
    (10, 'SAIDA', 4, 'Pedido #9'),
    (6, 'SAIDA', 6, 'Pedido #10'),
    (2, 'SAIDA', 1, 'Pedido #11'),
    (11, 'ENTRADA', 40, 'Compra fornecedor Tech Distribuidora'),
    (11, 'SAIDA', 3, 'Pedido #12'),
    (5, 'ENTRADA', 20, 'Compra fornecedor Móveis & Cia'),
    (5, 'SAIDA', 3, 'Pedido #15');
