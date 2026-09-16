import { Request, Response } from "express";
//Deve ser substituido futuramente por dados reais
class EstoqueListController {
  static getList(_req: Request, res: Response): void {
    const columns = [
      { key: "id", label: "Código do Item" },
      { key: "name", label: "Equipamento / Insumo" },
      { key: "category", label: "Categoria" },
      { key: "unit", label: "Unidade de Medida" },
      { key: "quantity", label: "Qtde Disponível" },
      { key: "status", label: "Status" }
    ];

    const data = [
      { id: "LOG001", name: "Palete de Madeira PBR", category: "Armazenagem", unit: "Unidade", quantity: 540, status: "Apropriado" },
      { id: "LOG002", name: "Bobina Filme Stretch 500x0.25", category: "Embalagem", unit: "Rolo", quantity: 120, status: "Normal" },
      { id: "LOG003", name: "Caixa de Papelão Duplo", category: "Embalagem", unit: "Fardo (x50)", quantity: 38, status: "Baixo Especial" },
      { id: "LOG004", name: "Leitor de Código de Barras S/ Fio", category: "Tecnologia", unit: "Unidade", quantity: 8, status: "Crítico" },
      { id: "LOG005", name: "Transpaleteira Manual 2 Ton", category: "Movimentação", unit: "Unidade", quantity: 12, status: "Normal" },
      { id: "LOG006", name: "Fita Adesiva Empacotamento Cuidado", category: "Embalagem", unit: "Caixa", quantity: 75, status: "Normal" },
      { id: "LOG007", name: "EPI - Bota de Segurança", category: "Segurança", unit: "Par", quantity: 45, status: "Normal" }
    ];

    res.status(200).json({ columns, data });
  }
}

export default EstoqueListController;
