# Clean Architecture

## Origem da Clean Architecture

- Termo criado por Robert C. Martin em 2012
- Tornou-se um livro
- Buzz word
- Proteção do domínio (core) da aplicação
  - Variação da arquitetura Hexagonal, Onion
- Baixo acoplamento entre camadas
- Orientada a casos de uso
  - Intenção de conseguir realizar uma ação
    - Criar uma categoria
    - Fazer uma compra

### Curiosidades sobre o livro

- Ele fala especificamente sobre Clean Architecture somente em 7 páginas do livro
- Tudo que ele fala especificamente sobre Clean Architecture está literalmente em um artigo em seu blog

### Por que devo ler o Livro

- Reforçar o conhecimento e remover gaps básicos que muitas vezes nem percebemos que temos
- Componentes
- Arquitetura
- Limites arquiteturais
- Percepção sobre regra de negócios
- Beber água direto da fonte sempre importa

## Pontos importantes sobre arquitetura

- Define o formato que o software terá
- Arquitetura é sobre divisões de componentes
- Comunicação entre componentes
- Uma boa arquitetura vai facilitar o processo de desenvolvimento, deploy, operação e manutenção
- A estratégia por traz da facilitação é deixar o máximo possível de opções abertas, pelo máximo de tempo possível. "Robert C. Martin"

## Mantenha opções abertas

O objetivo principal da arquitetura é dar suporte ao ciclo de vida do sistema.

Uma boa arquitetura torna o sistema fácil de entender, desenvolver manter e implantar. O objetivo final é minimizar o custo de vida útil do sistema e maximizar a produtividade do programador. "Robert C. Martin. Clean Architecture (p. 137)"

**Keep Options Open**

### Regras vs Detalhes

- Regras de negócio trazem o real valor para o software
- Detalhes ajudam a suportar as regras
- Detalhes não devem impactar nas regras de negócio
- Frameworks, banco de dados, apis, não devem impactar nas regras
  - São detalhes, não devem afetar as regras de negócios

## Casos de uso

- Representam intenções
- Clareza de cada comportamento do software
- Detalhes não devem impactar nas regras de negócio
- Frameworks, banco de dados, apis, não devem impactar nas regras

### Use Cases vs Single Responsability Principle

- Temos a tendência de reaproveitar use cases por serem muito parecidos
- Exemplo
  - Alterar vs Inserir
    - Ambos consultam se o registro existe, persistem dados. Mas são Use Cases diferentes. Por que?
    - Single Responsability Principle, quando estou ferindo?
      - Quando eu fizer uma alteração no código por razões diferentes do seu uso
      - Resista a vontade de reutilizar código, ao tratar de Use Cases

## O fluxo dos Use Cases

- Use Cases contam uma história
  - Múltiplos passos para representar uma intenção do software
  - É o orquestrador para alcançar uma intenção

## Limites arquiteturais

Tudo que não impacta diretamente nas regras de negócio deve estar em um limite arquitetural diferente.
Ex: Não será o frontend, banco de dados ou framework que mudarão as regras de negócio

## Input vs Output

- No final do dia, tudo se resume a um Input que retorna um Output
  - Exemplo:
    - Criar um pedido
      - Dados do pedido <- Input
      - Pedido criado -> dados de retorno do pedido, output
- Simplifique seu raciocínio ao criar um software sempre pensando em Input e Output

## DTO (Data Transfer Object)

- Trafegar dados entre os limites arquiteturais
- Objeto anêmico, sem comportamento
- Contém dados (Input ou Output)
- Não possui regras de negócio
- Não possui comportamento
- Não faz nada
- Normalmente cada use case possui seu dto de input e output

## Presenters

- são objetos de transformação
- Adequa o DTO de output no formato correto para entregar o resultado
- Lembrando:
  - Um sistema pode ter diversos formatos de entrega (XML, JSON, Protobuf, GraphQL, CLI)

## Entities vs DDD

- Entities da Clean Arch são diferentes do DDD
- Clean ARch define Entity como camada de regras de negócio
- Elas se aplicam a qualquer situação
- Não há definição explícita de como se criar entities
- Normalmente utilizamos táticas do DDD
- Entities = Agregados + Domain Services
