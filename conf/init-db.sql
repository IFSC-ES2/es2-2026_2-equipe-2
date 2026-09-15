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