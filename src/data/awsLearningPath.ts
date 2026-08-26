import type {
  LearningPath,
} from "../types/learning";

export const awsLearningPath: LearningPath = {
  id: "aws",

  title: "AWS Cloud",

  description:
    "Aprenda os principais serviços e conceitos da AWS através de teoria curta, exercícios e desafios práticos.",

  icon: "☁",

  color: "#ff9900",

  modules: [
    {
      id: "cloud-fundamentals",

      title: "Cloud Fundamentals",

      description:
        "Entenda Cloud Computing, AWS Global Infrastructure e os principais conceitos da nuvem.",

      icon: "☁",

      lessons: [
        {
          id: "what-is-cloud",

          title: "What is Cloud Computing?",

          description:
            "Entenda o que é Cloud Computing e por que empresas utilizam a nuvem.",

          estimatedMinutes: 5,

          xp: 30,

          content: [
            {
              id: "introduction",

              content:
                "Cloud Computing é a entrega sob demanda de recursos de tecnologia pela internet. Em vez de uma empresa comprar, instalar e manter fisicamente toda a sua infraestrutura de servidores, armazenamento, bancos de dados e redes, ela pode consumir esses recursos de um provedor de nuvem conforme a necessidade.",
            },

            {
              id: "traditional-infrastructure",

              title:
                "Infraestrutura tradicional",

              content:
                "Em um modelo tradicional, uma empresa precisa estimar antecipadamente a quantidade de infraestrutura necessária, comprar servidores, preparar um data center, configurar redes, instalar sistemas e manter todo esse ambiente. Isso exige investimento inicial e pode resultar tanto em falta quanto em excesso de capacidade.",
            },

            {
              id: "cloud-model",

              title:
                "O modelo de Cloud Computing",

              content:
                "Na nuvem, recursos podem ser provisionados em minutos. Uma aplicação pode utilizar servidores virtuais, armazenamento, bancos de dados e diversos outros serviços sem que a empresa precise possuir fisicamente o hardware utilizado.",
            },

            {
              id: "on-demand",

              title:
                "On-demand",

              content:
                "Um dos conceitos centrais da nuvem é o consumo sob demanda. Recursos podem ser criados quando necessários e removidos quando deixam de ser necessários. Isso permite que a infraestrutura acompanhe as necessidades reais da aplicação.",
            },

            {
              id: "pay-as-you-go",

              title:
                "Pay-as-you-go",

              content:
                "Outro conceito importante é o modelo pay-as-you-go. Em muitos serviços de nuvem, o cliente paga de acordo com o consumo realizado, reduzindo a necessidade de grandes investimentos antecipados em hardware.",
            },

            {
              id: "elasticity",

              title:
                "Elasticidade",

              content:
                "Cloud Computing também permite aumentar ou reduzir recursos de acordo com a demanda. Uma aplicação que recebe muito tráfego em determinado período pode aumentar sua capacidade e reduzi-la posteriormente.",
            },

            {
              id: "aws",

              title:
                "Onde entra a AWS?",

              content:
                "A Amazon Web Services, ou AWS, é uma plataforma de Cloud Computing que oferece serviços de compute, storage, networking, databases, analytics, security, machine learning e diversas outras categorias.",
            },

            {
              id: "summary",

              title:
                "Resumo",

              content:
                "Cloud Computing permite consumir infraestrutura e serviços de tecnologia pela internet de maneira sob demanda, escalável e com modelos de cobrança baseados em uso.",
            },
          ],

          exercises: [
            {
              id: "cloud-question-1",

              type:
                "multiple-choice",

              question:
                "Qual alternativa descreve melhor Cloud Computing?",

              options: [
                {
                  id: "a",

                  text:
                    "Comprar servidores físicos para cada nova aplicação.",
                },

                {
                  id: "b",

                  text:
                    "Consumir recursos computacionais sob demanda através da internet.",
                },

                {
                  id: "c",

                  text:
                    "Instalar sistemas operacionais apenas em computadores locais.",
                },

                {
                  id: "d",

                  text:
                    "Criar exclusivamente redes privadas dentro de um data center.",
                },
              ],

              correctAnswer: "b",

              explanation:
                "Cloud Computing permite consumir recursos como compute, storage, databases e networking sob demanda, sem que o cliente precise possuir fisicamente toda a infraestrutura.",

              xp: 6,
            },

            {
              id: "cloud-question-2",

              type:
                "multiple-choice",

              question:
                "O que significa o conceito de on-demand em Cloud Computing?",

              options: [
                {
                  id: "a",

                  text:
                    "Os recursos precisam ser comprados vários meses antes de serem utilizados.",
                },

                {
                  id: "b",

                  text:
                    "Os recursos podem ser provisionados quando forem necessários.",
                },

                {
                  id: "c",

                  text:
                    "Todos os servidores precisam permanecer ligados permanentemente.",
                },

                {
                  id: "d",

                  text:
                    "O cliente precisa administrar o hardware físico do provedor.",
                },
              ],

              correctAnswer: "b",

              explanation:
                "On-demand significa que recursos podem ser provisionados conforme a necessidade, sem depender da compra e instalação antecipada de hardware.",

              xp: 6,
            },

            {
              id: "cloud-question-3",

              type:
                "multiple-choice",

              question:
                "Qual é uma das principais vantagens do modelo pay-as-you-go?",

              options: [
                {
                  id: "a",

                  text:
                    "O cliente sempre paga o mesmo valor independentemente do consumo.",
                },

                {
                  id: "b",

                  text:
                    "Todo hardware passa a pertencer ao cliente.",
                },

                {
                  id: "c",

                  text:
                    "O custo pode acompanhar o nível de utilização dos recursos.",
                },

                {
                  id: "d",

                  text:
                    "Não existem custos relacionados ao uso da nuvem.",
                },
              ],

              correctAnswer: "c",

              explanation:
                "No modelo pay-as-you-go, muitos serviços são cobrados de acordo com o consumo, reduzindo a necessidade de grandes investimentos iniciais em infraestrutura.",

              xp: 6,
            },

            {
              id: "cloud-question-4",

              type:
                "multiple-choice",

              question:
                "Uma aplicação aumenta automaticamente sua capacidade durante períodos de alta demanda e reduz posteriormente. Qual conceito isso representa?",

              options: [
                {
                  id: "a",

                  text:
                    "Elasticidade",
                },

                {
                  id: "b",

                  text:
                    "Virtualização local",
                },

                {
                  id: "c",

                  text:
                    "Data center dedicado",
                },

                {
                  id: "d",

                  text:
                    "Capacidade fixa",
                },
              ],

              correctAnswer: "a",

              explanation:
                "Elasticidade é a capacidade de aumentar ou reduzir recursos de acordo com mudanças na demanda.",

              xp: 6,
            },

            {
              id: "cloud-question-5",

              type:
                "multiple-choice",

              question:
                "Qual das opções abaixo é um provedor de Cloud Computing?",

              options: [
                {
                  id: "a",

                  text:
                    "Amazon Web Services",
                },

                {
                  id: "b",

                  text:
                    "Git",
                },

                {
                  id: "c",

                  text:
                    "Linux Kernel",
                },

                {
                  id: "d",

                  text:
                    "Visual Studio Code",
                },
              ],

              correctAnswer: "a",

              explanation:
                "Amazon Web Services (AWS) é uma plataforma de Cloud Computing que oferece centenas de serviços de infraestrutura e plataforma.",

              xp: 6,
            },
          ],
        },

        {
  id: "aws-global-infrastructure",

  title: "AWS Global Infrastructure",

  description:
    "Entenda como a infraestrutura global da AWS é organizada em Regions, Availability Zones e Edge Locations.",

  estimatedMinutes: 8,

  xp: 40,

  content: [
    {
      id: "introduction",

      title: "Infraestrutura global da AWS",

      content:
        "A AWS opera uma infraestrutura distribuída globalmente. Em vez de manter todos os recursos em um único local físico, a plataforma organiza sua infraestrutura em diferentes áreas geográficas para oferecer disponibilidade, baixa latência, escalabilidade e maior resiliência.",
    },

    {
      id: "regions",

      title: "AWS Regions",

      content:
        "Uma AWS Region é uma área geográfica física onde a AWS possui infraestrutura. Exemplos incluem us-east-1, eu-west-1 e sa-east-1. Ao criar muitos recursos AWS, o cliente escolhe em qual Region eles serão executados. A escolha pode depender de fatores como latência, custo, requisitos regulatórios, disponibilidade de serviços e proximidade dos usuários.",
    },

    {
      id: "region-independence",

      title: "Regions são independentes",

      content:
        "As Regions são projetadas para operar de forma independente umas das outras. Recursos criados em uma Region normalmente não são automaticamente replicados para outra Region. Quando uma aplicação precisa operar em múltiplas Regions, essa arquitetura deve ser planejada e configurada.",
    },

    {
      id: "availability-zones",

      title: "Availability Zones",

      content:
        "Cada Region possui múltiplas Availability Zones, também chamadas de AZs. Uma Availability Zone representa uma ou mais instalações de data center com infraestrutura independente de energia, rede e conectividade. As AZs de uma mesma Region são conectadas por redes de baixa latência e alta capacidade.",
    },

    {
      id: "high-availability",

      title: "Por que utilizar múltiplas AZs?",

      content:
        "Distribuir uma aplicação entre múltiplas Availability Zones reduz o risco de um único ponto de falha. Por exemplo, uma aplicação pode executar instâncias EC2 em duas AZs diferentes atrás de um Application Load Balancer. Se uma AZ apresentar problemas, a aplicação pode continuar atendendo usuários através da outra.",
    },

    {
      id: "edge-locations",

      title: "Edge Locations",

      content:
        "Edge Locations são pontos da infraestrutura global utilizados principalmente para entregar conteúdo e serviços mais próximos dos usuários finais. Serviços como Amazon CloudFront utilizam essa infraestrutura para armazenar conteúdo em cache e reduzir a latência de entrega.",
    },

    {
      id: "cloudfront-example",

      title: "Exemplo com CloudFront",

      content:
        "Imagine uma aplicação hospedada em uma Region nos Estados Unidos e um usuário acessando o site no Brasil. Sem uma rede de distribuição de conteúdo, várias requisições precisariam percorrer uma longa distância. Com Amazon CloudFront, conteúdo em cache pode ser entregue através de uma localização de borda mais próxima do usuário.",
    },

    {
      id: "region-vs-az",

      title: "Region vs. Availability Zone",

      content:
        "Uma Region representa uma área geográfica maior. Dentro dessa Region existem múltiplas Availability Zones. Portanto, uma AZ pertence a uma Region. Uma arquitetura Multi-AZ utiliza múltiplas Availability Zones dentro de uma mesma Region, enquanto uma arquitetura Multi-Region utiliza duas ou mais Regions.",
    },

    {
      id: "summary",

      title: "Resumo",

      content:
        "A infraestrutura global da AWS pode ser entendida em três níveis principais: Regions representam áreas geográficas, Availability Zones fornecem isolamento e alta disponibilidade dentro de uma Region, e Edge Locations ajudam a entregar conteúdo e serviços mais próximos dos usuários.",
    },
  ],

  exercises: [
    {
      id: "global-infrastructure-question-1",

      type: "multiple-choice",

      question:
        "O que é uma AWS Region?",

      options: [
        {
          id: "a",

          text:
            "Um único servidor físico utilizado pela AWS.",
        },

        {
          id: "b",

          text:
            "Uma área geográfica onde a AWS mantém infraestrutura.",
        },

        {
          id: "c",

          text:
            "Uma rede privada criada dentro de uma conta AWS.",
        },

        {
          id: "d",

          text:
            "Um tipo de instância Amazon EC2.",
        },
      ],

      correctAnswer: "b",

      explanation:
        "Uma AWS Region é uma área geográfica física onde a AWS possui infraestrutura e oferece seus serviços.",
      
      xp: 8,
    },

    {
      id: "global-infrastructure-question-2",

      type: "multiple-choice",

      question:
        "Qual é a relação correta entre uma Region e uma Availability Zone?",

      options: [
        {
          id: "a",

          text:
            "Uma Availability Zone contém várias Regions.",
        },

        {
          id: "b",

          text:
            "Uma Region contém múltiplas Availability Zones.",
        },

        {
          id: "c",

          text:
            "Regions e Availability Zones representam exatamente a mesma coisa.",
        },

        {
          id: "d",

          text:
            "Availability Zones existem apenas para serviços de banco de dados.",
        },
      ],

      correctAnswer: "b",

      explanation:
        "Uma AWS Region é composta por múltiplas Availability Zones, permitindo arquiteturas resilientes dentro da mesma área geográfica.",

      xp: 8,
    },

    {
      id: "global-infrastructure-question-3",

      type: "multiple-choice",

      question:
        "Uma aplicação precisa continuar funcionando mesmo se uma Availability Zone apresentar uma falha. Qual abordagem é mais adequada?",

      options: [
        {
          id: "a",

          text:
            "Executar toda a aplicação em uma única EC2.",
        },

        {
          id: "b",

          text:
            "Executar recursos em múltiplas Availability Zones.",
        },

        {
          id: "c",

          text:
            "Colocar todos os recursos em uma única subnet.",
        },

        {
          id: "d",

          text:
            "Utilizar apenas uma Availability Zone com instâncias maiores.",
        },
      ],

      correctAnswer: "b",

      explanation:
        "Distribuir os recursos entre múltiplas Availability Zones reduz a dependência de um único local e aumenta a disponibilidade da aplicação.",

      xp: 8,
    },

    {
      id: "global-infrastructure-question-4",

      type: "multiple-choice",

      question:
        "Qual serviço utiliza Edge Locations para entregar conteúdo com menor latência aos usuários?",

      options: [
        {
          id: "a",

          text:
            "Amazon CloudFront",
        },

        {
          id: "b",

          text:
            "Amazon RDS",
        },

        {
          id: "c",

          text:
            "AWS IAM",
        },

        {
          id: "d",

          text:
            "Amazon EBS",
        },
      ],

      correctAnswer: "a",

      explanation:
        "Amazon CloudFront é uma CDN que utiliza a infraestrutura de edge locations para entregar conteúdo mais próximo dos usuários finais.",

      xp: 8,
    },

    {
      id: "global-infrastructure-question-5",

      type: "multiple-choice",

      question:
        "Qual alternativa representa uma arquitetura Multi-Region?",

      options: [
        {
          id: "a",

          text:
            "Duas instâncias EC2 em duas subnets da mesma Availability Zone.",
        },

        {
          id: "b",

          text:
            "Recursos distribuídos entre us-east-1 e eu-west-1.",
        },

        {
          id: "c",

          text:
            "Um Application Load Balancer com duas instâncias na mesma AZ.",
        },

        {
          id: "d",

          text:
            "Um bucket S3 contendo múltiplos objetos.",
        },
      ],

      correctAnswer: "b",

      explanation:
        "Uma arquitetura Multi-Region utiliza recursos em duas ou mais AWS Regions. us-east-1 e eu-west-1 representam Regions diferentes.",

      xp: 8,
    },
  ],
},

        {
          id:
            "shared-responsibility",

          title:
            "Shared Responsibility Model",

          description:
            "Entenda o que é responsabilidade da AWS e o que é responsabilidade do cliente.",

          estimatedMinutes: 6,

          xp: 40,

          content: [],

          exercises: [],
        },
      ],
    },

    {
      id: "iam",

      title:
        "Identity & Access Management",

      description:
        "Aprenda Users, Groups, Roles, Policies e boas práticas de segurança.",

      icon: "🔐",

      lessons: [
        {
          id:
            "iam-introduction",

          title:
            "Introduction to IAM",

          description:
            "Conheça os principais componentes do AWS IAM.",

          estimatedMinutes: 7,

          xp: 40,

          content: [],

          exercises: [],
        },

        {
          id:
            "iam-policies",

          title:
            "IAM Policies",

          description:
            "Entenda como políticas IAM controlam permissões.",

          estimatedMinutes: 8,

          xp: 50,

          content: [],

          exercises: [],
        },
      ],
    },

    {
      id: "ec2",

      title:
        "Amazon EC2",

      description:
        "Aprenda instâncias, AMIs, Security Groups, storage e modelos de compra.",

      icon: "🖥",

      lessons: [
        {
          id: "ec2-basics",

          title:
            "EC2 Fundamentals",

          description:
            "Entenda como funcionam as instâncias EC2.",

          estimatedMinutes: 8,

          xp: 50,

          content: [],

          exercises: [],
        },
      ],
    },

    {
      id: "s3",

      title:
        "Amazon S3",

      description:
        "Object Storage, buckets, storage classes, permissions e lifecycle.",

      icon: "🪣",

      lessons: [
        {
          id: "s3-basics",

          title:
            "S3 Fundamentals",

          description:
            "Conheça buckets, objects e os principais conceitos do Amazon S3.",

          estimatedMinutes: 8,

          xp: 50,

          content: [],

          exercises: [],
        },
      ],
    },

    {
      id: "vpc",

      title:
        "Amazon VPC",

      description:
        "Networking AWS: subnets, route tables, Internet Gateway, NAT Gateway e Security Groups.",

      icon: "🌐",

      lessons: [
        {
          id: "vpc-basics",

          title:
            "VPC Fundamentals",

          description:
            "Entenda como uma rede virtual funciona dentro da AWS.",

          estimatedMinutes: 10,

          xp: 60,

          content: [],

          exercises: [],
        },
      ],
    },
  ],
};