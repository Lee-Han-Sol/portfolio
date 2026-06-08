import { FaAws, FaGithub, FaJava, FaLinux } from "react-icons/fa6";
import {
    SiDocker,
    SiMysql,
    SiNodedotjs,
    SiReact,
} from "react-icons/si";
import { DiMsqlServer,DiDotnet  } from "react-icons/di";
export const skillGroups = [
    {
        title: "BackEnd",
        items: [
            {
                name: "Java",
                category: "BackEnd",
                description: "Spring Boot 기반 RESTful API 설계 및 비즈니스 로직 구현",
                icon: FaJava,
            },
            {
                name: "Node.js",
                category: "BackEnd",
                description: "TypeScript 기반 유연한 서버사이드 개발 및 유지보수",
                icon: SiNodedotjs,
            },
            {
                name: "C#",
                category: "BackEnd",
                description: "ASP.NET 기반 데모 프로그램 제작 및 모놀리식 서비스 제작",
                icon: DiDotnet,
            },
        ],
    },
    {
        title: "Database",
        items: [
            {
                name: "MySQL",
                category: "Database",
                description: "관계형 데이터 모델링, 쿼리 작성 및 데이터 처리",
                icon: SiMysql,
            },
            {
                name: "SQL Server",
                category: "Database",
                description: "데이터베이스 모델링, 쿼리 최적화 및 SQL 튜닝",
                icon: DiMsqlServer,
            },
        ],
    },
    {
        title: "FrontEnd",
        items: [
            {
                name: "React.js",
                category: "FrontEnd",
                description: "SPA 프레임워크 기반의 사용자 중심 인터페이스 및 웹 애플리케이션 구현",
                icon: SiReact,
            },
        ],
    },
    {
        title: "Infra & DevOps",
        items: [
            {
                name: "AWS",
                category: "Infra & DevOps",
                description: "EC2, RDS, Lambda, S3 기반 클라우드 환경 구성",
                icon: FaAws,
            },
            {
                name: "Linux",
                category: "Infra & DevOps",
                description: "Linux 서버 환경 배포 및 운영",
                icon: FaLinux,
            },
            {
                name: "GitHub",
                category: "Infra & DevOps",
                description: "GitHub Actions를 활용한 CI/CD 자동 배포 파이프라인 운영",
                icon: FaGithub,
            },
            {
                name: "Docker",
                category: "Infra & DevOps",
                description: "Docker Container 기반 환경 구축",
                icon: SiDocker,
            },
        ],
    },
];