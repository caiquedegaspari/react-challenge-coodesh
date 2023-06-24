This is a challenge by Coodesh.

Radio Browser.

Escute suas rádios favoritas online em um único lugar!

Instalação:

- Clone o projeto
- Abra o terminal do repositório e utilize o comando "yarn" para instalar as dependências.
- Utilize o comando "yarn start" no terminal do repositório para rodar o projeto em seu navegador.

Tecnologias:

- React
- Typescript
- Material-UI
- Eslint para organização de código
- Axios para consulta de APIs REST

Observações:

- Não utilizei Docker ou docker-compose para rodar a aplicação pois para mim, seria mais complicado para a pessoa que quiser rodar este app em sua máquina, já que não possui banco de dados e consome apenas uma API pública na WEB, acaba facilitando o processo, sendo necessário apenas rodar o comando yarn.

- Não criei testes unitários pois não tenho conhecimento na criação de testes no Front-end, apenas Back-end utilizando JEST. Estudei a possiblidade de aprender durante o desafio, mas acredito que isso atrapalharia o prazo e até a qualidade do código, além de que a qualidade/cobertura dos testes poderia não ser das melhores, visto que estaria aprendendo com pressa (seguindo o prazo estipulado).

- Não pude dedicar mais de 3 horas por dia nesse projeto por conta do meu emprego, mas a cada momento que podia desenvolver aqui, desenvolvi com foco, velocidade e a maior qualidade dentro do meu nível atual. Foi um projeto que me divertiu, entreteu, e trouxe aprendizado.

- Geralmente costumo utilizar small commits, fazendo commits descritivos para cada funcionalidade, correção de bugs e etc, mas decidi fazer o desafio todo de uma vez e deixar que as etapas de criação documentassem o processo de vida do código.

Etapas para criação e desenvolvimento do aplicativo:

- Iniciar o projeto com o comando create-react-app. Removi do repositório alguns arquivos que não seriam utilizados como estilos de App.css, index.css etc.

- Após isso, analisei o wireframe disponível e comecei a pensar em todos os possíveis comoponentes dentro da aplicação, e pensei também a respeito da arquitetura de pastas que utilizaria.

- Instalei a biblioteca de estilização Material-UI e preparei um tema para poder trabalhar de maneira melhor com as cores da aplicação, que foram escolhidas utilizando uma ferramenta na internet.

- Criei algumas pastas como pages/components e comecei a desenvolver os primeiros componentes, dos "pais" para os "filhos".

- Após criar uma base de todos os componentes que eu identifiquei como primordiais, adicionei estilizações básicas para dar mais vida a aplicação, além de analisar cada componente e decidir com qual display seria mais interesssante para trabalhar com eles (Flex ou Grid).

- Em seguida, comecei a analisar a API disponibilizada e entender como era a estrutura dos dados que seriam buscados. A principio, instalei a lib "axios" para fazer as buscas na API e trabalhei apenas com uma busca de 10 estações de rádio para criar a estrutura inicial de consulta a API e de como os dados seriam exibidos em tela.

- Após uma analise, decidi que era o momento de criar as funcionalidades que permitiam o usuário salvar rádios favoritas, excluir e pesquisar por nome, país ou idioma.

- Decidir salvar as informações das rádios favoritas no local storage do browser do usuário. Assim ao adicionar uma rádio favorita ela seria adicionada no local storage e ao excluir ela seria removida do local storage.

- Entretando comecei a enfrentar um problema para lidar com as rádios favoritas e apenas carregadas da api. Não estava havendo atualizações de maneira confiável nos dois componentes principais da aplicação: A barra lateral que serve para listar/pesquisar as rádios e a Lista de rádios favoritas do usuário. Para resolver este problema, criei um contexto, usando a Context API do React para poder gerenciar melhor as rádios favoritas/carregadas entre esses componentes, e funcionou como o esperado.

- Em seguida, desenvolvi a funcionalidade de busca de Rádios de acordo com os filtros necessários. Após uma análise dos componentes e de como eu poderia fazer essa busca por query params, decidi adicionar um componente que possibilitava o usuário escolher o tipo de filtro e um para que ele digitasse o parâmetro de busca em si. além de criar uma função padrão de busca na api, foi necessária uma função para converter uma simples string em um parâmetro correto de query params, mas isso foi simples.

- Logo após, fiquei interessado na funcionalidade de permitir que o usuário pudesse escutar/pausar uma rádio, já que nunca tinha feito isso com React. depois de uma breve pesquisa, vi que era mais simples do que eu poderia imaginar, implementei essa funcionalidade, e parecia pronto! Mas após alguns testes rápidos e chamar outras pessoas para darem o "play/pause" consegui identificar diversos bugs com a reprodução/pausa de aúdio, que chegavam até a quebrar a aplicação, mas logo comecei a trabalhar nesses bugs e resolver um por um. Em poucas horas, já havia me livrado de todos os bugs que havia identificado

- Depois disso comecei a estudar como faria a implementação da paginação de rádios. infelizmente não identifiquei na API algum retorno com a contagem das rádios de maneira dinâmica após aplicar filtros de busca ou algo do tipo. A única informação de contagem que identifiquei foi a contagem total de rádios salvas no banco. Pensei na possibilidade de buscar todas as rádios ao mesmo tempo e fazer todo o esquema de páginação dentro da aplicação, mas não acreditei que seria uma boa opção, por questões de desempenho e consumo de dados/processamento. Decidi usar a contagem total de rádios e informar o usuário caso não exista a rádio que ele está tentando pesquisar na página atual, caso a rádio não exista.

- A última funcionalidade do sistema que faltava era a edição de rádio, decidi que a edição deveria ser feita no nome ou descrição da rádio(propriedade que eu adicionei e que existe apenas em rádios favoritas), para fazer essa edição apenas adicionei uma modal com os dois campos, nome e descrição, no mínimo é necessário editar um campo ou fechar a modal caso não edite nenhum.

- Nessa etapa final faltava um ponto importante, a responsividade do site, trabalhei nisso e a principio foi algo fácil, mas ao tentar adaptar para uma tela de altura menor, encontrei problemas. Lutei com isso por um tempo até que conseguisse adaptar tanto para telas de celular com alturas altas quanto com alturas menores.

- Por último fiquei "brincando" com a aplicação e procurando erros, além de revisar todos os códigos e refatorar o que acreditei que fosse necessário. fui consertando os bugs que achava nesse meio tempo, que eram em sua maioria alguns bugs de layout como alinhamento de textos e conteúdos dentro de DIVs.
