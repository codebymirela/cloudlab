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

              title: "Infraestrutura tradicional",

              content:
                "Em um modelo tradicional, uma empresa precisa estimar antecipadamente a quantidade de infraestrutura necessária, comprar servidores, preparar um data center, configurar redes, instalar sistemas e manter todo esse ambiente. Isso exige investimento inicial e pode resultar tanto em falta quanto em excesso de capacidade.",
            },

            {
              id: "cloud-model",

              title: "O modelo de Cloud Computing",

              content:
                "Na nuvem, recursos podem ser provisionados em minutos. Uma aplicação pode utilizar servidores virtuais, armazenamento, bancos de dados e diversos outros serviços sem que a empresa precise possuir fisicamente o hardware utilizado.",
            },

            {
              id: "on-demand",

              title: "On-demand",

              content:
                "Um dos conceitos centrais da nuvem é o consumo sob demanda. Recursos podem ser criados quando necessários e removidos quando deixam de ser necessários. Isso permite que a infraestrutura acompanhe as necessidades reais da aplicação.",
            },

            {
              id: "pay-as-you-go",

              title: "Pay-as-you-go",

              content:
                "Outro conceito importante é o modelo pay-as-you-go. Em muitos serviços de nuvem, o cliente paga de acordo com o consumo realizado, reduzindo a necessidade de grandes investimentos antecipados em hardware.",
            },

            {
              id: "elasticity",

              title: "Elasticidade",

              content:
                "Cloud Computing também permite aumentar ou reduzir recursos de acordo com a demanda. Uma aplicação que recebe muito tráfego em determinado período pode aumentar sua capacidade e reduzi-la posteriormente.",
            },

            {
              id: "aws",

              title: "Onde entra a AWS?",

              content:
                "A Amazon Web Services, ou AWS, é uma plataforma de Cloud Computing que oferece serviços de compute, storage, networking, databases, analytics, security, machine learning e diversas outras categorias.",
            },

            {
              id: "summary",

              title: "Resumo",

              content:
                "Cloud Computing permite consumir infraestrutura e serviços de tecnologia pela internet de maneira sob demanda, escalável e com modelos de cobrança baseados em uso.",
            },
          ],

          exercises: [],
        },

        {
          id: "aws-global-infrastructure",

          title: "AWS Global Infrastructure",

          description:
            "Aprenda sobre Regions, Availability Zones e Edge Locations.",

          estimatedMinutes: 6,

          xp: 40,

          content: [],

          exercises: [],
        },

        {
          id: "shared-responsibility",

          title: "Shared Responsibility Model",

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

      title: "Identity & Access Management",

      description:
        "Aprenda Users, Groups, Roles, Policies e boas práticas de segurança.",

      icon: "🔐",

      lessons: [
        {
          id: "iam-introduction",

          title: "Introduction to IAM",

          description:
            "Conheça os principais componentes do AWS IAM.",

          estimatedMinutes: 7,

          xp: 40,

          content: [],

          exercises: [],
        },

        {
          id: "iam-policies",

          title: "IAM Policies",

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

      title: "Amazon EC2",

      description:
        "Aprenda instâncias, AMIs, Security Groups, storage e modelos de compra.",

      icon: "🖥",

      lessons: [
        {
          id: "ec2-basics",

          title: "EC2 Fundamentals",

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

      title: "Amazon S3",

      description:
        "Object Storage, buckets, storage classes, permissions e lifecycle.",

      icon: "🪣",

      lessons: [
        {
          id: "s3-basics",

          title: "S3 Fundamentals",

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

      title: "Amazon VPC",

      description:
        "Networking AWS: subnets, route tables, Internet Gateway, NAT Gateway e Security Groups.",

      icon: "🌐",

      lessons: [
        {
          id: "vpc-basics",

          title: "VPC Fundamentals",

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