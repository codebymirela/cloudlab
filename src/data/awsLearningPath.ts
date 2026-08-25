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

          exercises: [],
        },

        {
          id: "aws-global-infrastructure",

          title: "AWS Global Infrastructure",

          description:
            "Aprenda sobre Regions, Availability Zones e Edge Locations.",

          estimatedMinutes: 6,

          xp: 40,

          exercises: [],
        },

        {
          id: "shared-responsibility",

          title: "Shared Responsibility Model",

          description:
            "Entenda o que é responsabilidade da AWS e o que é responsabilidade do cliente.",

          estimatedMinutes: 6,

          xp: 40,

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

          exercises: [],
        },

        {
          id: "iam-policies",

          title: "IAM Policies",

          description:
            "Entenda como políticas IAM controlam permissões.",

          estimatedMinutes: 8,

          xp: 50,

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

          exercises: [],
        },
      ],
    },
  ],
};