import { useEffect, useState } from "react";
import { projects } from "./data/projects";
import { skillGroups } from "./data/skills";
import { experiences, educations } from "./data/profile";
import profileImage from "./assets/profile/profile.jpg";

const navItems = [
    // 영문
    // { label: "Projects", href: "#projects" },
    // { label: "Experience", href: "#experience" },
    // { label: "Architecture", href: "#skills" },
    // { label: "Contact", href: "#contact" },
    
    // 한글
    { label: "경력", href: "#experience" },
    // { label: "교육", href: "#education" },
    { label: "기술", href: "#skills" },
    { label: "프로젝트", href: "#projects" },
    { label: "연락처", href: "#contact" },
];

const sectionIds = navItems.map((item) => item.href.replace("#", ""));

function App() {
    const [selectedProject, setSelectedProject] = useState(null);
    const activeSection = useActiveSection(sectionIds);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setSelectedProject(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col font-body-md text-body-md bg-background text-on-background">
            <Header activeSection={activeSection} />

            <main className="flex-grow">
                <Hero />
                <Experience />
                {/*<Education />*/}
                <Skills />
                <Projects onOpenModal={setSelectedProject} />
                <About />
                <Contact />
            </main>

            <Footer />

            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </div>
    );
}

// 활성화된 네비게이션 훅
function useActiveSection(sectionIds) {
    const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

    useEffect(() => {
        const updateActiveSection = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            const isBottom =
                Math.ceil(scrollY + viewportHeight) >= documentHeight - 2;

            if (isBottom) {
                setActiveSection(sectionIds[sectionIds.length - 1]);
                return;
            }

            const checkPoint = 180;
            let currentSection = sectionIds[0] ?? "";

            sectionIds.forEach((id) => {
                const element = document.getElementById(id);

                if (!element) return;

                const sectionTop = element.offsetTop;
                const sectionBottom = sectionTop + element.offsetHeight;

                if (
                    scrollY + checkPoint >= sectionTop &&
                    scrollY + checkPoint < sectionBottom
                ) {
                    currentSection = id;
                }
            });

            setActiveSection(currentSection);
        };

        updateActiveSection();

        window.addEventListener("scroll", updateActiveSection, { passive: true });
        window.addEventListener("resize", updateActiveSection);

        return () => {
            window.removeEventListener("scroll", updateActiveSection);
            window.removeEventListener("resize", updateActiveSection);
        };
    }, [sectionIds]);

    return activeSection;
}

function scrollToSection(event, href) {
    event.preventDefault();

    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    const headerOffset = 80;
    const startPosition = window.scrollY;
    const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;

    const distance = targetPosition - startPosition;
    const duration = 700;
    const startTime = performance.now();

    const easeInOutCubic = (progress) => {
        return progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    };

    const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        } else {
            window.history.replaceState(null, "", href);
        }
    };

    requestAnimationFrame(animateScroll);
}

function Header({ activeSection }) {
    return (
        <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-white/10 w-full">
            <div className="max-w-container-max mx-auto px-margin-mobile grid grid-cols-[1fr_auto_1fr] items-center h-20">
                <a
                    href="#hero"
                    onClick={(event) => scrollToSection(event, "#hero")}
                    className="justify-self-start font-headline-lg text-headline-lg font-bold text-primary"
                >
                    Portfolio
                </a>

                <nav className="hidden md:flex items-center justify-center gap-2 justify-self-center">
                    {navItems.map((item) => {
                        const sectionId = item.href.replace("#", "");
                        const isActive = activeSection === sectionId;

                        return (
                            <a
                                key={item.href}
                                className={`px-3 py-2 rounded border text-[14px] leading-[20px] transition-all ${
                                    isActive
                                        ? "border-primary/40 bg-primary/10 text-primary"
                                        : "border-transparent text-on-surface-variant hover:text-primary hover:bg-white/5"
                                }`}
                                href={item.href}
                                onClick={(event) => scrollToSection(event, item.href)}
                            >
                                {item.label}
                            </a>
                        );
                    })}
                </nav>

                <div className="justify-self-end" />
            </div>
        </header>
    );
}

function Hero() {
    const mainEducation = educations?.[0];
    const typedTitle = useTypingText(
        '안정적인 서비스를 설계하고 구현하는 백엔드 개발자 "이한솔"입니다.',
        65,
        400
    );

    return (
        <section
            className="relative pt-28 pb-24 overflow-hidden border-b border-white/10 grid-bg scroll-mt-24"
            id="hero"
        >
            <div className="max-w-container-max mx-auto px-margin-mobile relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 flex flex-col justify-center">
                    <p className="font-code-sm text-code-sm text-secondary mb-4">
                        backend.portfolio = "ready"
                    </p>

                    <h1 className="font-display-lg text-display-lg mb-6 min-h-[112px] break-keep">
                        {typedTitle}
                        <span className="typing-cursor ml-1 text-primary">|</span>
                    </h1>

                    <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mb-8">
                        REST API, 인증 시스템, 데이터베이스 설계, AWS 배포 환경을 중심으로
                        서비스 전체 흐름을 이해하고, 유지보수 가능한 백엔드 구조를 만들어가는 개발자입니다.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-8">
                        <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 font-code-sm text-code-sm text-primary">
                            Backend Developer
                        </span>

                        <span className="rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 font-code-sm text-code-sm text-secondary">
                            REST API
                        </span>

                        <span className="rounded-full border border-tertiary/30 bg-tertiary/10 px-4 py-2 font-code-sm text-code-sm text-tertiary">
                            AWS / Docker
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <a
                            className="bg-primary text-on-primary px-6 py-3 rounded font-label-caps text-label-caps hover:opacity-80 transition-opacity flex items-center gap-2"
                            href="#projects"
                            onClick={(event) => scrollToSection(event, "#projects")}
                        >
                            <span
                                className="material-symbols-outlined"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                terminal
                            </span>
                            프로젝트 목록
                        </a>

                        <a
                            className="border border-primary/40 text-primary px-6 py-3 rounded font-label-caps text-label-caps hover:bg-primary/10 transition-colors flex items-center gap-2"
                            href="#contact"
                            onClick={(event) => scrollToSection(event, "#contact")}
                        >
                            <span className="material-symbols-outlined">
                                mail
                            </span>
                            연락하기
                        </a>
                    </div>
                </div>

                <div className="lg:col-span-5 flex lg:justify-end">
                    <div className="w-full max-w-[360px] relative bg-surface-container border border-white/10 rounded-lg p-6 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5" />

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 rounded-lg bg-primary/20 blur-2xl" />

                                <img
                                    src={profileImage}
                                    alt="이한솔 프로필 사진"
                                    className="relative h-56 w-56 rounded-lg object-cover border border-primary/30"
                                />
                            </div>

                            <p className="font-code-sm text-code-sm text-secondary mb-2">
                                HanSol Lee
                            </p>

                            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-3">
                                백엔드 개발자
                            </h2>

                            <p className="font-body-md text-[15px] leading-[24px] text-on-surface-variant mb-6">
                                실무 프로젝트에서 시스템 구축, 레거시 개선, 인프라 도입,
                                프론트엔드 구현까지 서비스 전반의 개발 흐름을 경험했습니다.
                            </p>

                            {mainEducation && (
                                <div className="w-full rounded-lg bg-surface border border-white/10 p-4 text-left">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="material-symbols-outlined text-primary text-lg">
                                            school
                                        </span>

                                        <span className="font-label-caps text-label-caps text-primary">
                                            Education
                                        </span>
                                    </div>

                                    <h3 className="font-body-md text-body-md text-on-surface">
                                        {mainEducation.school}
                                    </h3>

                                    <p className="font-code-sm text-code-sm text-on-surface-variant mt-1">
                                        {mainEducation.major}
                                    </p>

                                    <p className="font-code-sm text-code-sm text-secondary mt-2">
                                        {mainEducation.period}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function useTypingText(text, speed = 70, startDelay = 300) {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let timeoutId;
        let intervalId;

        timeoutId = window.setTimeout(() => {
            let index = 0;

            intervalId = window.setInterval(() => {
                setDisplayText(text.slice(0, index + 1));
                index += 1;

                if (index >= text.length) {
                    window.clearInterval(intervalId);
                }
            }, speed);
        }, startDelay);

        return () => {
            window.clearTimeout(timeoutId);
            window.clearInterval(intervalId);
        };
    }, [text, speed, startDelay]);

    return displayText;
}

function Experience() {
    return (
        <section
            className="py-20 bg-surface-container-lowest border-b border-white/10 scroll-mt-24"
            id="experience"
        >
            <div className="max-w-container-max mx-auto px-margin-mobile">
                <SectionTitle>경력</SectionTitle>

                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
                    <CareerSummary />

                    <div className="relative space-y-5">
                        <div className="hidden lg:block absolute left-[-25px] top-8 bottom-8 w-px bg-white/10" />

                        {experiences.map((experience, index) => (
                            <article
                                key={`${experience.company}-${experience.period}`}
                                className="relative bg-surface-container border border-white/10 rounded-lg p-6 hover:border-primary/40 hover:bg-surface-container-high transition-all"
                            >
                                <div className="hidden lg:block absolute -left-[33px] top-8 h-4 w-4 rounded-2xl border-2 border-primary bg-background shadow-[0_0_16px_rgba(137,206,255,0.35)]" />

                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div>
                                        <div className="font-code-sm text-code-sm text-secondary mb-2">
                                            EXPERIENCE {String(experiences.length - index).padStart(2, "0")}
                                        </div>

                                        <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
                                            {experience.company}
                                        </h3>

                                        <p className="text-on-surface-variant font-code-sm text-code-sm mt-1">
                                            {experience.role}
                                        </p>
                                    </div>

                                    <div className="w-fit rounded-lg border border-secondary/30 bg-secondary/10 px-3 py-1 font-code-sm text-code-sm text-secondary whitespace-nowrap">
                                        {experience.period}
                                    </div>
                                </div>

                                <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {experience.items.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start gap-3 rounded-lg bg-surface/70 border border-white/5 p-3 text-on-surface-variant"
                                        >
                                            <span className="mt-2 h-1.5 w-1.5 rounded-lg bg-primary shrink-0" />
                                            <span className="font-body-md text-[15px] leading-[23px]">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function Education() {
    return (
        <section
            className="py-20 bg-surface border-b border-white/10 scroll-mt-24"
            id="education"
        >
            <div className="max-w-container-max mx-auto px-margin-mobile">
                <SectionTitle>교육</SectionTitle>

                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                    <SectionIntro
                        eyebrow="Education"
                        title="전공 기반의 문제 해결 역량"
                        description="메카트로닉스 전공을 기반으로 하드웨어, 시스템 구조, 소프트웨어 개발 흐름을 함께 이해하며 백엔드 개발 역량을 확장해왔습니다."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {educations.map((education, index) => (
                            <article
                                key={`${education.school}-${education.period}`}
                                className="bg-surface-container border border-white/10 rounded-xl p-6 min-h-[180px] flex flex-col justify-between hover:border-primary/40 hover:bg-surface-container-high transition-all"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-4 mb-4">
                                        <div className="font-code-sm text-code-sm text-secondary">
                                            EDUCATION {String(index + 1).padStart(2, "0")}
                                        </div>

                                        <div className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 font-code-sm text-code-sm text-secondary whitespace-nowrap">
                                            {education.period}
                                        </div>
                                    </div>

                                    <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
                                        {education.school}
                                    </h3>

                                    <p className="text-on-surface-variant font-body-md text-body-md mt-2">
                                        {education.major}
                                    </p>
                                </div>

                                {education.description && (
                                    <p className="mt-5 w-fit rounded-lg bg-surface border border-white/5 px-3 py-2 text-on-surface-variant font-code-sm text-code-sm">
                                        {education.description}
                                    </p>
                                )}
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function Skills() {
    return (
        <section
            className="py-20 bg-background border-b border-white/10 scroll-mt-24"
            id="skills"
        >
            <div className="max-w-container-max mx-auto px-margin-mobile">
                <SectionTitle>기술</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {skillGroups.map((group) => {
                        const groupStyle = getSkillGroupStyle(group.title);

                        return (
                            <section key={group.title} className="min-w-0">
                                <div className="flex items-center justify-between mb-4">
                                    <span
                                        className={`inline-flex items-center rounded-lg px-3 py-1 font-code-sm text-code-sm font-semibold border ${groupStyle.badge}`}
                                    >
                                        {group.title}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {group.items.map((item) => (
                                        <SkillBoardCard
                                            key={item.name}
                                            item={item}
                                            groupStyle={groupStyle}
                                        />
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function SkillBoardCard({ item, groupStyle }) {
    const Icon = item.icon;

    return (
        <article className="rounded-lg border border-white/10 bg-surface-container p-4 min-h-[138px] transition-all hover:border-primary/30 hover:bg-surface-container-high">
            <div className="flex items-center gap-3 mb-3">
                <div
                    className={`h-8 w-8 rounded-lg border flex items-center justify-center shrink-0 ${groupStyle.iconBox}`}
                >
                    {Icon && <Icon className="text-[17px]" />}
                </div>

                <h4 className="font-body-md text-[17px] leading-[24px] font-semibold text-on-surface">
                    {item.name}
                </h4>
            </div>

            <span
                className={`inline-flex rounded-lg px-2 py-1 mb-3 font-code-sm text-[11px] leading-[14px] font-semibold border ${groupStyle.smallBadge}`}
            >
                {item.category ?? item.group ?? ""}
            </span>

            <p className="text-on-surface-variant text-[14px] leading-[23px] break-keep">
                {item.description}
            </p>
        </article>
    );
}

function getSkillGroupStyle(title) {
    switch (title) {
        case "BackEnd":
        case "Backend":
            return {
                badge: "bg-secondary/20 text-secondary border-secondary/30",
                smallBadge: "bg-secondary/15 text-secondary border-secondary/20",
                iconBox: "bg-secondary/10 text-secondary border-secondary/20",
            };

        case "Database":
        case "DB":
            return {
                badge: "bg-error/20 text-error border-error/30",
                smallBadge: "bg-error/15 text-error border-error/20",
                iconBox: "bg-error/10 text-error border-error/20",
            };

        case "FrontEnd":
        case "Frontend":
            return {
                badge: "bg-violet-400/20 text-violet-300 border-violet-400/30",
                smallBadge: "bg-violet-400/15 text-violet-300 border-violet-400/20",
                iconBox: "bg-violet-400/10 text-violet-300 border-violet-400/20",
            };

        case "Infra & DevOps":
        case "Infrastructure":
        case "DevOps":
            return {
                badge: "bg-primary/20 text-primary border-primary/30",
                smallBadge: "bg-primary/15 text-primary border-primary/20",
                iconBox: "bg-primary/10 text-primary border-primary/20",
            };

        case "Tools":
            return {
                badge: "bg-tertiary/20 text-tertiary border-tertiary/30",
                smallBadge: "bg-tertiary/15 text-tertiary border-tertiary/20",
                iconBox: "bg-tertiary/10 text-tertiary border-tertiary/20",
            };

        default:
            return {
                badge: "bg-primary/20 text-primary border-primary/30",
                smallBadge: "bg-primary/15 text-primary border-primary/20",
                iconBox: "bg-primary/10 text-primary border-primary/20",
            };
    }
}

function Projects({ onOpenModal }) {
    return (
        // <section
        //     className="py-24 bg-surface border-b border-white/10 scroll-mt-24"
        //     id="projects"
        // >
        <section
            className="py-24 bg-surface-container-lowest border-b border-white/10 scroll-mt-24"
            id="projects"
        >
            <div className="max-w-container-max mx-auto px-margin-mobile">
                <SectionTitle>프로젝트</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onOpenModal={onOpenModal}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, onOpenModal }) {
    return (
        <article
            role="button"
            tabIndex={0}
            onClick={() => onOpenModal(project)}
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    onOpenModal(project);
                }
            }}
            className={`${project.span} bg-surface-container border border-white/10 rounded-lg p-6 hover:border-primary transition-colors group relative overflow-hidden flex flex-col justify-between cursor-pointer`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
                <h3 className="font-headline-lg-mobile text-primary text-headline-lg-mobile mb-2">
                    {project.title}
                </h3>

                <p className="text-on-surface-variant font-body-md text-body-md mb-4">
                    {project.description}
                </p>
            </div>

            <div className="relative z-10 mt-8 flex justify-between items-end gap-4">
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-surface-container-high text-on-surface px-2 py-1 rounded font-code-sm text-code-sm"
                        >
              {tag}
            </span>
                    ))}
                </div>

                <span className="font-code-sm text-code-sm text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1 whitespace-nowrap">
          View Details
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </span>
            </div>
        </article>
    );
}

function About() {
    const aboutKeywords = [
        "Career Transition",
        "Backend Architecture",
        "Operation Mindset",
    ];

    return (
        <section
            className="py-24 bg-surface border-b border-white/10 scroll-mt-24"
            id="about"
        >
            <div className="max-w-container-max mx-auto px-margin-mobile">
                <SectionTitle>짧은 소개</SectionTitle>

                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-gutter">
                    <aside className="bg-surface-container border border-white/10 rounded-lg p-6 h-fit">
                        <p className="font-code-sm text-code-sm text-secondary mb-3">
                            Developer Profile
                        </p>

                        <h3 className="text-[22px] leading-[30px] font-semibold text-on-surface mb-4 break-keep">
                            운영까지 고려하는 백엔드 개발자
                        </h3>

                        <div className="flex flex-wrap gap-2">
                            {aboutKeywords.map((keyword) => (
                                <span
                                    key={keyword}
                                    className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-1 font-code-sm text-code-sm text-primary"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </aside>

                    <div className="bg-surface-container border border-white/10 rounded-lg p-8">
                        <div className="space-y-5 max-w-[920px]">
                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed break-keep">
                                기구설계 엔지니어로 커리어를 시작했지만, 소프트웨어와 웹 개발에 대한 관심으로 개발자로 전향했습니다.
                                C# .NET 기반 업무 시스템 개발을 시작으로, 이후 NestJS와 Spring 기반 백엔드 구조를 설계하고 개선하는 경험을 쌓아왔습니다.
                            </p>

                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed break-keep">
                                실무에서는 출입통제, 인사정보 동기화, 출퇴근 자동화 등 업무 흐름을 연결하는 백엔드 로직을 구현했고,
                                데이터 정합성, 예외 처리, 배치 자동화, 배포와 운영까지 고려하는 개발의 중요성을 배웠습니다.
                            </p>

                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed break-keep">
                                저는 단순히 기능을 구현하는 것보다, 협업자가 이해하고 유지보수할 수 있는 구조를 만드는 것을 중요하게 생각합니다.
                                앞으로도 백엔드를 중심으로 서비스 전반을 이해하고 안정적으로 운영할 수 있는 개발자로 성장하고자 합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Contact() {
    return (
        // <section
        //     className="py-24 bg-surface border-b border-white/10 scroll-mt-24"
        //     id="contact"
        // >
        <section
            className="py-24 bg-surface-container-lowest border-b border-white/10 scroll-mt-24"
            id="contact"
        >
            <div className="bg-surface-container border border-white/10 rounded-lg p-8 max-w-2xl mx-auto text-center">
                <p className="font-body-md text-body-md text-on-surface-variant mb-8 break-keep">
                    백엔드 개발, API 설계, 서버 배포와 관련된 기회를 기다리고 있습니다.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <a
                        className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-lg font-label-caps text-label-caps hover:opacity-80 transition-opacity"
                        href="mailto:rlfthsxo@gmail.com"
                    >
                        <span aria-hidden="true">✉️</span>
                        Email
                    </a>

                    <a
                        className="inline-flex items-center justify-center gap-2 border border-primary/40 text-primary px-8 py-4 rounded-lg font-label-caps text-label-caps hover:bg-primary/10 transition-colors"
                        href="tel:010-8752-2499"
                    >
                        <span aria-hidden="true">📞</span>
                        연락처
                    </a>
                </div>
            </div>
        </section>
    );
}

function ProjectModal({ project, onClose }) {
    const architectureImages = project.architectureImages ?? [];
    const techGroups = project.detail?.techGroups ?? [];
    const designPoints = project.detail?.designPoints ?? [];
    const implementations = project.detail?.implementations ?? [];
    const troubleshooting = project.detail?.troubleshooting ?? [];
    const members = project.detail?.members ?? [];
    const achievements = project.detail?.achievements ?? [];

    return (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6">
            <button
                type="button"
                aria-label="Close modal backdrop"
                className="absolute inset-0 cursor-pointer"
                onClick={onClose}
            />

            <div className="relative z-10 bg-surface-container border border-primary/30 rounded-lg shadow-[0_0_24px_rgba(0,0,0,0.5)] w-full max-w-[1280px] max-h-[calc(100dvh-24px)] lg:max-h-[90dvh] overflow-y-auto lg:overflow-hidden custom-scrollbar flex flex-col lg:flex-row">
                <div className="flex-1 min-w-0 p-5 sm:p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/10 lg:overflow-y-auto lg:max-h-[90dvh] custom-scrollbar">
                    <div className="sticky top-0 z-20 -mx-5 sm:-mx-6 lg:mx-0 -mt-5 sm:-mt-6 lg:mt-0 px-5 sm:px-6 lg:px-0 pt-5 sm:pt-6 lg:pt-0 pb-4 bg-surface-container/95 backdrop-blur-md lg:static lg:bg-transparent lg:backdrop-blur-0">
                        <div className="flex justify-between items-start gap-4">
                            <div className="min-w-0">
                                <h2 className="font-headline-lg text-[24px] sm:text-[28px] lg:text-headline-lg leading-[32px] lg:leading-[40px] text-primary break-keep">
                                    {project.title}
                                </h2>

                                {(project.period || project.contribution) && (
                                    <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 font-code-sm text-code-sm text-on-surface-variant">
                                        {project.period && (
                                            <span className="rounded-lg border border-white/10 bg-surface px-2 py-1">
                                                {project.period}
                                            </span>
                                        )}

                                        {project.contribution && (
                                            <span className="rounded-lg border border-secondary/20 bg-secondary/10 px-2 py-1 text-secondary">
                                                기여도 {project.contribution}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                aria-label="Close modal"
                                className="shrink-0 text-on-surface-variant hover:text-primary transition-colors"
                                onClick={onClose}
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                    </div>

                    <ModalSectionTitle>프로젝트 개요</ModalSectionTitle>
                    
                    <p className="font-body-md text-[15px] sm:text-body-md leading-[25px] sm:leading-[26px] text-on-surface-variant mb-8 break-keep">
                        {project.detail?.summary}
                    </p>

                    <ModalSectionTitle>시스템 아키텍처</ModalSectionTitle>

                    {architectureImages.length > 0 ? (
                        <div className="space-y-4 mb-8">
                            {architectureImages.map((image) => (
                                <div
                                    key={image.alt}
                                    className="bg-surface border border-white/5 rounded-lg p-3 sm:p-4 flex items-center justify-center overflow-x-auto"
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="relative z-10 w-full max-h-[520px] object-contain rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-surface border border-white/5 rounded-lg p-6 mb-8 text-on-surface-variant font-code-sm text-code-sm break-keep">
                            등록된 아키텍처 이미지가 없습니다.
                        </div>
                    )}

                    {designPoints.length > 0 && (
                        <>
                            <ModalSectionTitle>핵심 설계 포인트</ModalSectionTitle>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {designPoints.map((point) => (
                                    <article
                                        key={point.title}
                                        className="bg-surface border border-white/5 rounded-lg p-4"
                                    >
                                        <h5 className="font-body-md text-body-md text-primary font-semibold mb-2 break-keep">
                                            {point.title}
                                        </h5>

                                        <p className="text-on-surface-variant text-[15px] leading-[24px] break-keep">
                                            {point.description}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </>
                    )}

                    <ModalSectionTitle>구현 내용</ModalSectionTitle>

                    <ol className="space-y-3 mb-8 list-decimal pl-5 font-body-md text-[15px] sm:text-body-md leading-[24px] text-on-surface-variant marker:text-primary break-keep">
                        {implementations.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ol>

                    {troubleshooting.length > 0 && (
                        <>
                            <ModalSectionTitle>운영 / 트러블슈팅 경험</ModalSectionTitle>

                            <ul className="space-y-3 mb-8">
                                {troubleshooting.map((item) => (
                                    <li
                                        key={item}
                                        className="font-body-md text-[15px] leading-[24px] text-on-surface-variant flex items-start gap-2 break-keep"
                                    >
                                        <span className="text-tertiary">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    <ModalSectionTitle>관련 멤버</ModalSectionTitle>

                    <ul className="space-y-2 mb-8">
                        {members.map((member) => (
                            <li
                                key={member}
                                className="font-body-md text-[15px] sm:text-body-md text-on-surface-variant flex items-start gap-2 break-keep"
                            >
                                <span className="text-primary">•</span>
                                {member}
                            </li>
                        ))}
                    </ul>

                    <ModalSectionTitle>성과</ModalSectionTitle>

                    <ul className="space-y-3 mb-2">
                        {achievements.map((item) => (
                            <li
                                key={item}
                                className="font-body-md text-[15px] sm:text-body-md leading-[24px] text-on-surface-variant flex items-start gap-2 break-keep"
                            >
                                <span className="text-primary">•</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <aside className="w-full lg:w-[360px] shrink-0 bg-surface p-5 sm:p-6 lg:p-8 lg:max-h-[90dvh] lg:overflow-y-auto custom-scrollbar">
                    <h4 className="font-label-caps text-label-caps text-secondary mb-6">
                        Technical Specs
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 lg:gap-10">
                        {techGroups.map((group) => (
                            <TechGroup key={group.title} group={group} />
                        ))}
                    </div>

                    {project.githubUrl && project.githubUrl !== "#" && (
                        <div className="mt-12">
                            <p className="text-on-surface-variant text-[13px] leading-[20px] mb-3 break-keep">
                                실행 방법, 배포 과정, 트러블슈팅 상세 내용은 GitHub README에 정리했습니다.
                            </p>

                            <a
                                className="w-full border border-primary text-primary px-4 py-3 rounded-lg font-label-caps text-label-caps hover:bg-primary/10 transition-colors flex justify-center items-center gap-2"
                                href={project.githubUrl}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <span className="material-symbols-outlined text-sm">code</span>
                                전체 README / 코드 보기
                            </a>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
}

function TechGroup({ group }) {
    const style = getTechGroupStyle(group.accent);

    return (
        <section className="min-w-0">
            <h5
                className={`font-code-sm text-code-sm text-on-surface mb-4 border-l-2 pl-3 break-keep ${style.border}`}
            >
                {group.title}
            </h5>

            <ul className="space-y-3">
                {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 min-w-0">
                        <span className={`mt-2 h-2 w-2 rounded-lg shrink-0 ${style.dot}`} />
                        <span className="font-code-sm text-code-sm text-on-surface-variant break-keep">
                            {item}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function getTechGroupStyle(accent) {
    switch (accent) {
        case "secondary":
            return {
                border: "border-secondary",
                dot: "bg-secondary",
            };

        case "tertiary":
            return {
                border: "border-tertiary",
                dot: "bg-tertiary",
            };

        case "primary":
        default:
            return {
                border: "border-primary",
                dot: "bg-primary",
            };
    }
}

function Footer() {
    return (
        <footer className="bg-surface-container-low border-t border-white/10 w-full mt-auto">
            <div className="max-w-container-max mx-auto px-margin-mobile py-stack-lg flex flex-col md:flex-row justify-between items-center gap-stack-sm">
                <div className="font-label-caps text-label-caps text-on-surface">
                    © 2026 Lee-Han-Sol. Built with React and Vite.
                </div>

                <div className="flex gap-4">
                    <a
                        className="text-on-surface-variant hover:text-secondary transition-colors opacity-80 font-code-sm text-code-sm"
                        href="https://github.com/Lee-Han-Sol"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
}

function SectionTitle({ children }) {
    return (
        <div className="mb-12">
            <h2 className="text-[32px] leading-[40px] font-semibold text-on-surface">
                {children}
            </h2>
            <div className="mt-4 h-px bg-white/10" />
        </div>
    );
}

function SectionIntro({ eyebrow, title, description }) {
    return (
        <aside className="bg-surface-container border border-white/10 rounded-lg p-7 h-fit lg:sticky lg:top-28">
            <p className="font-code-sm text-code-sm text-secondary mb-3">
                {eyebrow}
            </p>

            <h3 className="text-[22px] leading-[30px] font-semibold text-on-surface mb-4">
                {title}
            </h3>

            <p className="text-[15px] leading-[24px] text-on-surface-variant">
                {description}
            </p>
        </aside>
    );
}

function CareerSummary() {
    const summaryItems = [
        "기구설계 엔지니어에서 개발자로 전향",
        "C# .NET 기반 업무 자동화 및 백엔드 로직 구현",
        "NestJS / Spring 기반 구조 전환 경험",
        "AWS 인프라, CI/CD, 이벤트 기반 구조 경험",
    ];

    return (
        <aside className="bg-surface-container border border-white/10 rounded-lg p-7 h-fit lg:sticky lg:top-28">
            <p className="font-code-sm text-code-sm text-secondary mb-3">
                Work Experience
            </p>

            <h3 className="text-[22px] leading-[30px] font-semibold text-on-surface mb-4 break-keep">
                기구설계에서 백엔드 개발로 이어진 커리어 전환
            </h3>

            <p className="text-[15px] leading-[25px] text-on-surface-variant break-keep mb-6">
                기구설계 엔지니어로 커리어를 시작했지만, 소프트웨어와 웹 개발에 대한 관심으로 개발자로 전향했습니다.<br/><br/>
                C# .NET 기반 업무 시스템 개발을 거쳐, 현재는 NestJS, Spring, AWS 환경에서 운영까지 고려하는 백엔드 구조를 만들어가고 있습니다.
            </p>

            <ul className="space-y-3">
                {summaryItems.map((item) => (
                    <li
                        key={item}
                        className="flex items-start gap-3 rounded-lg bg-surface/70 border border-white/5 p-3"
                    >
                        <span className="mt-2 h-1.5 w-1.5 rounded-lg bg-primary shrink-0" />
                        <span className="text-[14px] leading-[22px] text-on-surface-variant break-keep">
                            {item}
                        </span>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

function ModalSectionTitle({ children }) {
    return (
        <h4 className="font-label-caps text-label-caps text-secondary mb-4 border-b border-white/10 pb-2">
            {children}
        </h4>
    );
}

export default App;