import bleLockerArchitecture from "../assets/projects/ble-locker-architecture.png";
import constructionAttendanceArchitecture from "../assets/projects/construction-attendance-architecture.png";
import msaReverseProxyArchitecture from "../assets/projects/msa-reverse-proxy-architecture.png";
import msaGrpcArchitecture from "../assets/projects/msa-grpc-architecture.png";
import gasAlertArchitecture from "../assets/projects/gas-alert-architecture.png";

export const projects = [
  {
    id: "ble-locker-system",
    title: "BLE 락커 시스템",
    description:
      "NestJS 기반 App, Tablet, Web API를 분리하고 BLE 락커 제어와 Redis/FCM 알림 흐름을 구성한 시스템입니다.",
    period: "2024년 8월 5일 → 2025년 6월 15일",
    contribution: "50%",
    tags: ["NestJS", "TypeScript", "MySQL", "Redis", "FCM", "Nginx"],
    span: "md:col-span-8",
    architectureImages: [
      {
        src: bleLockerArchitecture,
        alt: "BLE 락커 시스템 아키텍처",
      },
    ],
    githubUrl: "#",
    detail: {
      summary:
        "BLE 락커 제어를 위한 백엔드 시스템을 NestJS 기반 모노레포로 구축하고, App / Tablet / Web 클라이언트 성격에 맞춰 API 서버를 분리했습니다. 백엔드는 태블릿을 BLE 통신 중개 주체로 활용하면서, 스마트폰 근거리 직접 제어와 원거리 간접 제어를 함께 지원하도록 설계했습니다.",
      implementations: [
        "NestJS 기반 모노레포 구조로 App API / Tablet API / Web API를 분리해 독립 프로세스로 실행",
        "공통 도메인 엔티티, DTO, 유틸리티, 설정/인프라 모듈을 분리해 재사용 가능하도록 구성",
        "Nginx를 통해 도메인 또는 경로 기준으로 내부 API 서버 포트에 프록시하도록 구성",
        "백엔드가 제어 요청을 수신한 뒤 연결 가능한 태블릿을 식별하고 태블릿 측으로 제어 신호 전달",
        "태블릿 BLE 중개 제어와 스마트폰 근거리 직접 BLE 제어를 모두 지원하는 하이브리드 제어 흐름 구현",
        "Redis 기반 메시지 처리와 FCM 푸시 알림으로 락커 배정 및 상태 변경 이벤트 안내",
      ],
      members: [
        "이한솔: App, Tablet용 Backend API 설계 및 구현, 공통 모듈화, AWS EC2/S3/Nginx 인프라 구축, Redis 기반 FCM 푸시 알림 구현",
        "Backend 개발자 1명: Web용 Backend API 설계 및 구현",
        "React 개발자 1명: Web 관리자 페이지 API 연동 및 UI/UX 구현",
        "Flutter App 개발자 1명: 사용자용 스마트폰 App 개발 및 API 연동",
        "Android 외주 개발자 1명: Tablet App 개발 및 Tablet-Locker 간 BLE 통신 제어",
      ],
      achievements: [
        "App / Tablet / Web을 하나의 백엔드 코드베이스에서 관리하면서도 API 서버를 역할별로 분리",
        "공통 모듈 재사용 구조로 도메인 로직, DTO, 유틸, 설정 관리의 중복 감소",
        "태블릿을 BLE 중개기로 활용해 원격 락커 제어 흐름 구현",
        "스마트폰 근거리 직접 제어와 태블릿 중개 제어를 함께 지원",
        "Nginx 기반 라우팅으로 동일 서버에서 복수 API 애플리케이션 운영 구조 마련",
        "Redis와 FCM 기반 실시간 사용자 알림 체계 구성",
      ],
      techGroups: [
        {
          title: "Languages & Frameworks",
          accent: "primary",
          items: ["TypeScript", "NestJS", "Flutter", "Android"],
        },
        {
          title: "Infrastructure & Data",
          accent: "secondary",
          items: ["MySQL", "Redis", "AWS Linux", "AWS EC2", "AWS S3", "Nginx"],
        },
        {
          title: "Messaging & Notification",
          accent: "tertiary",
          items: ["Redis Message Processing", "FCM Push Notification", "BLE Control Flow"],
        },
      ],
    },
  },
  {
    id: "msa-refactoring",
    title: "백엔드 마이크로서비스 전환 & 시스템 리팩토링",
    description:
      "Spring Boot, gRPC, Nginx 기반으로 레거시 백엔드 구조를 서비스 분리와 단일 진입점 구조로 개선한 프로젝트입니다.",
    period: "2024년 9월 25일 → 2025년 6월 15일",
    contribution: "70%",
    tags: ["Spring Boot", "Java", "gRPC", "React", "Nginx", "MySQL"],
    span: "md:col-span-4",
    architectureImages: [
      {
        src: msaReverseProxyArchitecture,
        alt: "리버스 프록시 기반 단일 포트 노출 아키텍처",
      },
      {
        src: msaGrpcArchitecture,
        alt: "MSA와 gRPC 하드웨어 제어 백엔드 아키텍처",
      },
    ],
    githubUrl: "#",
    detail: {
      summary:
        "사내 PC 1대를 Nginx 리버스 프록시로 구성해 외부에는 단일 포트만 노출하고, 도메인/경로 기반으로 내부 웹 서버에 라우팅되도록 설계했습니다. 또한 기존 REST 기반 웹 서버와 하드웨어 제어 기능을 분리하고, 제조사 제공 gRPC SDK를 활용해 장치 연동 책임을 별도 서비스로 분리했습니다.",
      implementations: [
        "Nginx 리버스 프록시 기반 단일 포트 노출 구조 설계",
        "도메인 및 경로 기반 내부 웹 서버 라우팅 구조 구성",
        "RESTful API 설계: 인증/인가, 예외/로깅, Validation, 요청 스키마 합의",
        "도메인별 서비스 분리와 공통 유틸, 에러 핸들러, 응답 규약 모듈화",
        "확장성을 고려한 커스터마이징 DB 설계",
        "N+1, 불필요 I/O 정리, 캐시/DB 인덱싱 협업, 페이징/정렬 규칙 표준화",
        "로그 포맷 표준화, 상태체크 엔드포인트, 기본 지표 트래킹 구성",
      ],
      members: [
        "이한솔: Backend API 설계 및 구현, DB 설계, 서비스 분리, 공통 모듈화, 성능 개선, 모니터링 고도화, 인프라 구축",
        "React 개발자 2명: API 연동, 기존 자사 솔루션 UI/UX 리뉴얼, React/Vite 기반 프론트엔드 개발",
      ],
      achievements: [
        "서비스 확장 및 배포 단위가 명확해져 유지보수성과 확장성 향상",
        "로그, 상태체크, 알림 흐름을 일원화해 장애 분석 및 대응 흐름 단축",
      ],
      techGroups: [
        {
          title: "Languages & Frameworks",
          accent: "primary",
          items: ["Java", "Spring Boot", "gRPC", "React", "Vite"],
        },
        {
          title: "Infrastructure & Data",
          accent: "secondary",
          items: ["MySQL", "Windows Server", "Nginx", "Reverse Proxy"],
        },
        {
          title: "Architecture & Ops",
          accent: "tertiary",
          items: ["MSA", "Service Decoupling", "Health Check", "Logging", "Monitoring"],
        },
      ],
    },
  },
  {
    id: "construction-attendance-sync",
    title: "건설사 출입통제 & 인사정보 동기화 / 출퇴근 자동화",
    description:
      "C# 데몬과 ASP.NET 기반으로 외부 출입인증 장치 데이터를 자사 SQL Server로 동기화하고 출퇴근/노임대장 흐름을 자동화했습니다.",
    period: "2023년 3월 2일 → 2025년 6월 15일",
    contribution: "70%",
    tags: ["C#", "ASP.NET", "Windows Service", "SQL Server", "Windows Server"],
    span: "md:col-span-4",
    architectureImages: [
      {
        src: constructionAttendanceArchitecture,
        alt: "건설사 출입통제 및 인사정보 동기화 아키텍처",
      },
    ],
    githubUrl: "#",
    detail: {
      summary:
        "외부 출입인증 장치와 벤더 연동 프로그램에 구성된 데이터를 자사 서비스에서 활용하기 위해 C# 기반 동기화 데몬을 개발하고, 자사 DB인 SQL Server로 데이터 이관 구조를 구축했습니다. 이를 기반으로 ASP.NET 웹 서비스를 설계·개발하고 운영/관리 기능과 유지보수 기능을 제공했습니다.",
      implementations: [
        "인사 DB와 출입통제 장치 간 데이터 동기화 파이프라인 구축",
        "정합성 검증, 리트라이, 재처리 흐름 구성",
        "출퇴근 자동화 로직 설계: 지연, 중복 처리, 예외 케이스 보정",
        "노임대장 산출 기능 구현",
        "동기화 현황, 오류 대시보드, 수동 재처리 기능을 제공하는 웹 관리 화면 구현",
      ],
      members: [
        "개발 팀원 전원: 고객사별 웹 커스터마이징 서비스 제공 및 유지보수 진행",
      ],
      achievements: [
        "야간 배치 자동화로 수작업과 휴먼 에러 감소 및 처리 안정성 향상",
        "실시간/주기 동기화로 데이터 최신성 확보 및 운영 대응 시간 단축",
        "고객사 요구사항에 맞춘 웹서비스 커스터마이징 제공",
      ],
      techGroups: [
        {
          title: "Languages & Frameworks",
          accent: "primary",
          items: ["C#", ".NET Framework 4.5~4.7.2", "ASP.NET Web"],
        },
        {
          title: "Batch & Automation",
          accent: "secondary",
          items: ["Windows Service", "Task Scheduler", "Daemon Program"],
        },
        {
          title: "Infrastructure & Data",
          accent: "tertiary",
          items: ["SQL Server", "Windows Server", "External Access Control DB"],
        },
      ],
    },
  },
  {
    id: "frontend-infra-attendance",
    title: "프론트엔드 구현 및 인프라 구축",
    description:
      "React/Vite 기반 본사 관리자 페이지와 국가·개소별 근태 통계 대시보드를 구현하고 EC2/Nginx 배포 구조를 구성했습니다.",
    period: "2025년 3월 31일 → 2025년 5월 2일",
    contribution: "50%",
    tags: ["React", "Vite", "Spring Boot", "Flutter", "MySQL", "Nginx"],
    span: "md:col-span-4",
    architectureImages: [],
    githubUrl: "#",
    detail: {
      summary:
        "태블릿에 표시된 QR 또는 근무자가 QR을 촬영하는 방식으로 출퇴근을 기록하는 근태 관리 프로젝트입니다. 약 5개국에 걸친 운영 지점의 근태 현황을 본사에서 통합 관리할 수 있도록 관리자 웹 페이지와 통계 대시보드를 구현했습니다.",
      implementations: [
        "본사 관리자용 웹 페이지 구현",
        "국가 및 개소 등록/관리 기능 제공",
        "근무자 출퇴근 기록 조회 화면 구현",
        "국가별 / 개소별 통계 대시보드 화면 구현",
        "도넛 차트 그래프를 활용한 출퇴근 현황 시각화",
        "AWS EC2 Ubuntu 서버 환경 구성",
        "Nginx로 하나의 DNS 요청을 프론트엔드와 백엔드 서비스로 분기",
      ],
      members: [
        "Backend 개발자 1명: API 설계, DB 설계, 출퇴근 기록/개소 관리/통계 조회 서버 기능 제공",
        "Flutter 개발자 1명: 회원가입, 근무자 개인 출퇴근 관리, 관리자용 개소 단위 통계 확인 기능 구현",
        "이한솔: React/Vite 관리자 페이지 구현, 본사용 국가/개소 등록 관리, 근무자 기록 조회, 대시보드 및 통계 화면 구현",
        "이한솔: AWS EC2 Ubuntu 환경 구성, Nginx 기반 프론트엔드/백엔드 분리 운영, DNS 기반 접근 구조 구성",
      ],
      achievements: [
        "여러 국가와 개소에 분산된 출퇴근 데이터를 본사에서 통합 조회할 수 있는 관리자 페이지 구축",
        "국가별, 개소별 출퇴근 통계를 시각화한 대시보드 제공",
        "웹과 모바일 역할을 분리해 사용자용/관리자용 기능을 명확하게 구성",
        "단일 서버 환경에서 Nginx + AWS EC2 Ubuntu 기반으로 프론트엔드와 백엔드 분리 운영 구조 구성",
        "실제 운영 환경에서 본사가 여러 해외 지점의 근태 현황을 한 번에 파악할 수 있도록 지원",
      ],
      techGroups: [
        {
          title: "Languages & Frameworks",
          accent: "primary",
          items: ["React", "Vite", "Flutter", "Java", "Spring Boot"],
        },
        {
          title: "Infrastructure & Data",
          accent: "secondary",
          items: ["MySQL", "AWS EC2 Ubuntu", "Linux", "Nginx", "DNS Routing"],
        },
        {
          title: "UI & Dashboard",
          accent: "tertiary",
          items: ["Admin Page", "Attendance Dashboard", "Donut Chart", "Filtering UI"],
        },
      ],
    },
  },
  {
    id: "gas-alert-system",
    title: "가스 감지 알림 시스템 (개인)",
    description:
      "가스 측정값을 REST API로 저장하고 위험 이벤트를 Outbox 패턴으로 분리해 SNS, Lambda, Slack 알림으로 전달한 개인 프로젝트입니다.",
    period: "2026년 3월 9일 → 2026년 3월 23일",
    contribution: "100%",
    tags: ["Node.js", "TypeScript", "Fastify", "TypeORM", "AWS SNS", "Lambda", "Terraform"],
    span: "md:col-span-4",
    architectureImages: [
      {
        src: gasAlertArchitecture,
        alt: "가스 감지 알림 시스템 아키텍처",
      },
    ],
    githubUrl: "https://github.com/Lee-Han-Sol/ToyProject_01",
    detail: {
      summary:
        "가스 측정기기에서 측정값이 들어오면 REST API로 저장하고, 위험 이벤트를 비동기로 발행하여 SNS → Lambda → Slack 알림을 전송하는 시스템입니다. 인프라는 Terraform으로 구성하고 EC2 + Docker + GitHub Actions로 자동 배포했습니다.",
      implementations: [
        "가스 측정기기에서 측정값 수신 → REST API 호출 → DB 저장",
        "위험도 판정 결과를 Outbox 패턴으로 안정적으로 이벤트화",
        "이벤트를 AWS SNS로 발행하고 AWS Lambda가 구독하여 Slack으로 알림 전송",
        "Terraform으로 인프라를 코드화하고 EC2 + Docker + GitHub Actions로 자동 배포",
        "EC2 IAM Role로 SNS publish 권한을 위임해 AccessKey를 서버에 두지 않도록 구성",
      ],
      members: ["이한솔"],
      achievements: [
        "저장 동기 로직과 알림 비동기 로직 분리",
        "Outbox로 정합성과 재시도 기반 마련",
        "SNS로 fan-out 확장 가능한 이벤트 허브 구성",
        "EC2 IAM Role 기반으로 AWS 키 없이 SNS publish",
        "Terraform + GitHub Actions로 재현 가능한 운영 자동화 구성",
      ],
      techGroups: [
        {
          title: "Languages & Frameworks",
          accent: "primary",
          items: ["Node.js", "TypeScript", "Fastify", "TypeORM"],
        },
        {
          title: "Infrastructure & Data",
          accent: "secondary",
          items: ["MySQL (Docker)", "AWS SNS", "AWS Lambda", "EC2", "Docker Compose"],
        },
        {
          title: "DevOps & Quality",
          accent: "tertiary",
          items: ["Terraform", "GitHub Actions", "Swagger(OpenAPI)", "Vitest", "Slack Incoming Webhook"],
        },
      ],
    },
  },
];
