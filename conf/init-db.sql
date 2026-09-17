-- AQUI VÃO OS ARQUIVOS PARA GERAR AS TABELAS DO BANCO
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
                                  ('Alimentos');
-- Fornecedores
INSERT INTO fornecedores (nome, cnpj, telefone, email) VALUES
                                                           ('Tech Distribuidora Ltda', '12.345.678/0001-90', '(11) 4002-8922', 'contato@techdist.com.br'),
                                                           ('Papelaria Central Ltda', '98.765.432/0001-10', '(11) 3555-1234', 'vendas@papelariacentral.com.br'),
                                                           ('Móveis & Cia', '11.222.333/0001-44', '(11) 2233-4455', 'comercial@moveisecia.com.br');
-- Clientes
INSERT INTO clientes (nome, email, telefone, documento, endereco) VALUES
                                                                      ('Maria Silva', 'maria.silva@email.com', '(11) 98888-1111', '123.456.789-00', 'Rua das Flores, 100 - São Paulo/SP'),
                                                                      ('João Pereira', 'joao.pereira@email.com', '(11) 97777-2222', '987.654.321-00', 'Av. Paulista, 200 - São Paulo/SP'),
                                                                      ('Empresa ABC Ltda', 'contato@empresaabc.com.br', '(11) 96666-3333', '45.678.912/0001-33', 'Rua Comercial, 300 - São Paulo/SP');
-- Produtos
INSERT INTO produtos (sku, nome, descricao, categoria_id, fornecedor_id, preco, quantidade, estoque_minimo) VALUES
                                                                                                                ('ELE-0001', 'Smartphone XPTO 128GB', 'Smartphone com 128GB de armazenamento e câmera tripla', 1, 1, 1899.90, 25, 5),
                                                                                                                ('INF-0001', 'Notebook Ultra 15"', 'Notebook 15 polegadas, 16GB RAM, SSD 512GB', 2, 1, 4599.00, 10, 3),
                                                                                                                ('PAP-0001', 'Caderno Universitário 200 fls', 'Caderno espiral capa dura', 3, 2, 24.90, 150, 20),
                                                                                                                ('PAP-0002', 'Caneta Esferográfica Azul', 'Caixa com 50 unidades', 3, 2, 39.90, 80, 10),
                                                                                                                ('MOV-0001', 'Cadeira de Escritório Ergonômica', 'Cadeira com apoio lombar ajustável', 4, 3, 749.00, 15, 4);
-- Pedidos
INSERT INTO pedidos (cliente_id, status, valor_total) VALUES
                                                          (1, 'PENDENTE', 1899.90),
                                                          (2, 'CONCLUIDO', 4623.90),
                                                          (3, 'CANCELADO', 74.80);
-- Itens do pedido
INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES
                                                                                 (1, 1, 1, 1899.90),
                                                                                 (2, 2, 1, 4599.00),
                                                                                 (2, 3, 1, 24.90),
                                                                                 (3, 4, 2, 39.90);
INSERT INTO movimentacoes_estoque (produto_id, tipo, quantidade, referencia) VALUES
                                                                                 (1, 'ENTRADA', 30, 'Compra fornecedor Tech Distribuidora'),
                                                                                 (1, 'SAIDA', 1, 'Pedido #1'),
                                                                                 (2, 'ENTRADA', 12, 'Compra fornecedor Tech Distribuidora'),
                                                                                 (2, 'SAIDA', 1, 'Pedido #2'),
                                                                                 (3, 'ENTRADA', 170, 'Compra fornecedor Papelaria Central'),
                                                                                 (3, 'SAIDA', 1, 'Pedido #2'),
                                                                                 (4, 'ENTRADA', 90, 'Compra fornecedor Papelaria Central'),
                                                                                 (4, 'SAIDA', 2, 'Pedido #3 (cancelado)');