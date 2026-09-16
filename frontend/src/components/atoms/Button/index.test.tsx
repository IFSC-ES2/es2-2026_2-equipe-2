import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '.';

describe('Átomo Button', () => {
  it('deve renderizar corretamente os elementos filhos (children)', () => {
    render(<Button>Clique Aqui</Button>);
    const buttonElement = screen.getByText('Clique Aqui');
    expect(buttonElement).toBeDefined();
    expect(buttonElement.tagName).toBe('BUTTON');
  });

  it('deve aplicar as classes corretas de variante (variant) e tamanho (size)', () => {
    render(
      <Button variant="danger" size="sm">
        Deletar
      </Button>,
    );
    const buttonElement = screen.getByText('Deletar');
    expect(buttonElement.className).toContain('btn');
    expect(buttonElement.className).toContain('btn-danger');
    expect(buttonElement.className).toContain('btn-sm');
  });

  it('deve disparar a função onClick ao ser clicado', () => {
    let clicado = false;
    const onClick = () => {
      clicado = true;
    };
    render(<Button onClick={onClick}>Teste de Clique</Button>);

    const buttonElement = screen.getByText('Teste de Clique');
    fireEvent.click(buttonElement);

    expect(clicado).toBe(true);
  });
});
