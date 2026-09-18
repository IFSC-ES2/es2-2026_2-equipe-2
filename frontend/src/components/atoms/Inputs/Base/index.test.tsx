import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import FormInput from '.';

describe('Atom FormInput', () => {
  it('deve renderizar o label informado', () => {
    render(
      <FormInput label="Nome" name="name" value="Palete" onChange={vi.fn()} />,
    );

    expect(screen.getByText('Nome')).toBeDefined();
  });

  it('deve associar o label ao input pelo atributo id', () => {
    render(
      <FormInput label="Nome" name="name" value="Palete" onChange={vi.fn()} />,
    );

    const input = screen.getByLabelText('Nome') as HTMLInputElement;

    expect(input).toBeDefined();
    expect(input.id).toBe('name');
  });

  it('deve renderizar o input com o atributo name correto', () => {
    render(
      <FormInput label="Nome" name="name" value="Palete" onChange={vi.fn()} />,
    );

    const input = screen.getByLabelText('Nome') as HTMLInputElement;

    expect(input.name).toBe('name');
  });

  it('deve renderizar o input com o tipo informado', () => {
    render(
      <FormInput
        label="Quantidade"
        name="quantity"
        type="number"
        value={10}
        onChange={vi.fn()}
      />,
    );

    const input = screen.getByLabelText('Quantidade') as HTMLInputElement;

    expect(input.type).toBe('number');
  });

  it('deve manter o valor informado', () => {
    render(
      <FormInput
        label="Nome"
        name="name"
        value="Palete de Madeira"
        onChange={vi.fn()}
      />,
    );

    const input = screen.getByLabelText('Nome') as HTMLInputElement;

    expect(input.value).toBe('Palete de Madeira');
  });

  it('deve aplicar a classe padrão do Bootstrap', () => {
    render(
      <FormInput label="Nome" name="name" value="Palete" onChange={vi.fn()} />,
    );

    const input = screen.getByLabelText('Nome') as HTMLInputElement;

    expect(input.className).toContain('form-control');
  });

  it('deve aplicar classes adicionais recebidas por props', () => {
    render(
      <FormInput
        label="Nome"
        name="name"
        value="Palete"
        className="campo-customizado"
        onChange={vi.fn()}
      />,
    );

    const input = screen.getByLabelText('Nome') as HTMLInputElement;

    expect(input.className).toContain('form-control');
    expect(input.className).toContain('campo-customizado');
  });

  it('deve chamar onChange ao alterar o valor do input', () => {
    const onChange = vi.fn();

    render(<FormInput label="Nome" name="name" value="" onChange={onChange} />);

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: {
        value: 'Bobina Filme Stretch',
      },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('deve repassar propriedades extras para o input', () => {
    render(
      <FormInput
        label="Nome"
        name="name"
        value="Palete"
        disabled
        placeholder="Digite o nome"
        onChange={vi.fn()}
      />,
    );

    const input = screen.getByLabelText('Nome') as HTMLInputElement;

    expect(input.disabled).toBe(true);
    expect(input.placeholder).toBe('Digite o nome');
  });

  it('deve renderizar o input com id igual ao name', () => {
    render(
      <FormInput
        label="Categoria"
        name="category"
        value=""
        onChange={vi.fn()}
      />,
    );

    const input = screen.getByLabelText('Categoria') as HTMLInputElement;

    expect(input.id).toBe('category');
    expect(input.name).toBe('category');
  });
});
