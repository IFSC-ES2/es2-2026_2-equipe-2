import { Request, Response } from "express";

// Deve ser substituído futuramente por dados reais
class EstoqueCadastroController {
  static getForm(_req: Request, res: Response): void {
    const fields = [
      {
        name: "id",
        label: "Código do Item",
        value: "",
        type: "text"
      },
      {
        name: "name",
        label: "Equipamento / Insumo",
        value: "",
        type: "text"
      },
      {
        name: "category",
        label: "Categoria",
        value: "",
        type: "text"
      },
      {
        name: "unit",
        label: "Unidade de Medida",
        value: "",
        type: "text"
      },
      {
        name: "quantity",
        label: "Qtde Disponível",
        value: 0,
        type: "number"
      },
      {
        name: "status",
        label: "Status",
        value: "Normal",
        type: "select",
        options: [
          { label: "Apropriado", value: "Apropriado" },
          { label: "Normal", value: "Normal" },
          { label: "Baixo Especial", value: "Baixo Especial" },
          { label: "Crítico", value: "Crítico" }
        ]
      }
    ];

    res.status(200).json({ fields });
  }

  static getEditForm(req: Request, res: Response): void {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    if (!id) {
      res.status(400).json({
        message: "Código do item não informado."
      });
      return;
    }

    const mockItems: Record<string, Record<string, string | number>> = {
      LOG001: {
        id: "LOG001",
        name: "Palete de Madeira PBR",
        category: "Armazenagem",
        unit: "Unidade",
        quantity: 540,
        status: "Apropriado"
      },
      LOG002: {
        id: "LOG002",
        name: "Bobina Filme Stretch 500x0.25",
        category: "Embalagem",
        unit: "Rolo",
        quantity: 120,
        status: "Normal"
      },
      LOG003: {
        id: "LOG003",
        name: "Caixa de Papelão Duplo",
        category: "Embalagem",
        unit: "Fardo (x50)",
        quantity: 38,
        status: "Baixo Especial"
      },
      LOG004: {
        id: "LOG004",
        name: "Leitor de Código de Barras S/ Fio",
        category: "Tecnologia",
        unit: "Unidade",
        quantity: 8,
        status: "Crítico"
      }
    };

    const item = mockItems[id] ?? {
      id,
      name: "Item mockado para edição",
      category: "Categoria mockada",
      unit: "Unidade",
      quantity: 1,
      status: "Normal"
    };

    const fields = [
      {
        name: "id",
        label: "Código do Item",
        value: item.id,
        type: "text"
      },
      {
        name: "name",
        label: "Equipamento / Insumo",
        value: item.name,
        type: "text"
      },
      {
        name: "category",
        label: "Categoria",
        value: item.category,
        type: "text"
      },
      {
        name: "unit",
        label: "Unidade de Medida",
        value: item.unit,
        type: "text"
      },
      {
        name: "quantity",
        label: "Qtde Disponível",
        value: item.quantity,
        type: "number"
      },
      {
        name: "status",
        label: "Status",
        value: item.status,
        type: "select",
        options: [
          { label: "Apropriado", value: "Apropriado" },
          { label: "Normal", value: "Normal" },
          { label: "Baixo Especial", value: "Baixo Especial" },
          { label: "Crítico", value: "Crítico" }
        ]
      }
    ];

    res.status(200).json({ fields });
  }

  static create(req: Request, res: Response): void {
    const item = req.body;

    res.status(201).json({
      message: "Item cadastrado com sucesso.",
      data: item
    });
  }

  static update(req: Request, res: Response): void {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    if (!id) {
      res.status(400).json({
        message: "Código do item não informado."
      });
      return;
    }

    const item = req.body;

    res.status(200).json({
      message: "Item atualizado com sucesso.",
      data: {
        ...item,
        id
      }
    });
  }
}

export default EstoqueCadastroController;