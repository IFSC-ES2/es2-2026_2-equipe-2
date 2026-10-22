import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response } from "express";

const mocks = vi.hoisted(() => ({
  categoria: { findById: vi.fn(), update: vi.fn(), delete: vi.fn() },
  cliente: { findById: vi.fn(), update: vi.fn(), delete: vi.fn() },
  produto: { findById: vi.fn(), update: vi.fn(), delete: vi.fn() },
}));

vi.mock("../../src/config/logger", () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
}));

vi.mock("../../src/services/index", () => ({
  CategoriaService: class {
    findById = mocks.categoria.findById;
    update = mocks.categoria.update;
    delete = mocks.categoria.delete;
  },
  ClienteService: class {
    findById = mocks.cliente.findById;
    update = mocks.cliente.update;
    delete = mocks.cliente.delete;
  },
  ProdutoService: class {
    findById = mocks.produto.findById;
    update = mocks.produto.update;
    delete = mocks.produto.delete;
  },
}));

import { CategoriaController } from "../../src/controllers/CategoriaController";
import { ClienteController } from "../../src/controllers/ClienteController";
import { ProdutoController } from "../../src/controllers/ProdutoController";

type Metodo = "findById" | "update" | "delete";
const metodos: Metodo[] = ["findById", "update", "delete"];

const controllers = [
  {
    nome: "CategoriaController",
    Classe: CategoriaController,
    service: mocks.categoria,
  },
  {
    nome: "ClienteController",
    Classe: ClienteController,
    service: mocks.cliente,
  },
  {
    nome: "ProdutoController",
    Classe: ProdutoController,
    service: mocks.produto,
  },
];

function makeRes() {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };
  return res as unknown as Response & {
    status: ReturnType<typeof vi.fn>;
    json: ReturnType<typeof vi.fn>;
  };
}

function makeReq(id: string | undefined): Request {
  return { params: { id }, body: { nome: "Teste" } } as unknown as Request;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe.each(controllers)("$nome — validação de ID", ({ Classe, service }) => {
  describe.each(metodos)("%s", (metodo) => {
    it.each(["abc", "", undefined])(
      "responde 400 e não chama o service quando o id é inválido (%s)",
      async (idInvalido) => {
        const controller = new Classe();
        const res = makeRes();

        await controller[metodo](makeReq(idInvalido), res);

        expect(res.status).toHaveBeenCalledWith(400);
        const body = res.json.mock.calls[0][0];
        expect(body.success).toBe(false);
        expect(body.status).toBe(400);
        expect(service[metodo]).not.toHaveBeenCalled();
      },
    );
  });
});