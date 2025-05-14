export const DEFAULT_SECTIONS = [
  {
    type: "home",
    content: {
      title: "사용자 이름",
      subtitle: "포트폴리오 이름",
      description: "사용자 중심의 [직업] 입니다",
      profileImage: "/default-profile.jpg",
    },
    sortOrder: 0,
  },
  {
    type: "uxui",
    content: {},
    sortOrder: 1,
  },
  {
    type: "webRedesign",
    content: {},
    sortOrder: 2,
  },
  {
    type: "detailpage",
    content: {},
    sortOrder: 3,
  },

  //카테고리 타입 project 섹션 템플릿
  {
    categoryId: "카테고리-UUID",
    content: {
      contentTitle: "UIUX Project",
      description: "스스로 시작한 다양한 프로젝트를 모았습니다.",
      projects: [
        {
          projectName: "프로젝트 이름",
          logoImage: { src: "/asset/image/Logo.png" },
          projectDescription: "프로젝트 설명...",
          date: "2025.02 ~ 2025.07",
          stacks: [{ stackName: "Figma", stackLogo: "/file.svg" }],
          projectImage: { src: "/asset/image/Logo_Image.png" },
          Participation: 54,
        },
      ],
    },
  },

  //카테고리 타입 profile 섹션 템플릿
  {
    categoryId: "카테고리-UUID",
    content: {
      contentTitle: "kim yurim Designer PORTFOLIO",
      shortIntro: "안녕하세요. 사용자와 함께 성장하는 프로덕트 디자이너, 김유림 입니다.",
      contact: {
        mbti: "INTJ",
        birthDate: "2001.03.01",
        phone: "010-7339-1682",
        email: "dbflal22@naver.com",
      },
      information: [
        {
          title: "학력사항",
          items: [
            {
              description: "울산과학대학교 졸업(사회복지학과)",
              period: "2020.03 ~ 2023.02",
            },
          ],
        },
        {
          title: "경력사항",
          items: [
            {
              description: "(주)루토닉스 디자인팀",
              period: "2024.12 ~ ing",
            },
            {
              description: " (주)비팩토리 디자인팀",
              period: "2022.11 ~ 2023.05",
            },
          ],
        },
        {
          title: "교육",
          items: [
            {
              description: "스나이퍼팩토리[ UI/UX 인턴형 프로그램 6기 ]",
              period: "2024.10 ~ 2024.12",
            },
            {
              description: "SBS아카데미컴퓨터아트학원[ UIUX 퍼블리셔 웹학과 심화교육 ]",
              period: "2023.09 ~ 2024.07",
            },
            {
              description:
                "울산그린컴퓨터아카데미[ 반응형 웹 디자인(UIUX) & 웹퍼블리셔(코딩) 실무 양성과정 ]",
              period: "2022.03 ~ 2022.07",
            },
          ],
        },
      ],
      skills: [
        {
          name: "Figma",
          level: 4,
          description: "[ 프로토타입 제작 및 팀 협업 경험 ]",
        },
        {
          name: "Adobe XD",
          level: 2,
          description: "[ 와이어프레임 및 인터랙션 설계 시안 제작 가능 ]",
        },
        {
          name: "Adobe Photoshop / Illustrator",
          level: 4,
          description: "[ 상세페이지, 브랜딩 디자인 실무 경험 ]",
        },
        {
          name: "HTML5 / CSS",
          level: 3.5,
          description: "[ 반응형 웹 퍼블리싱 기본 구현 가능 ]",
        },
        {
          name: "javaScript",
          level: 2,
          description: "[ 인터랙션 기초 수준 ]",
        },
        {
          name: "WordPress",
          level: 2,
          description: "[ 템플릿 커스터마이징 및 콘텐츠 관리 가능 ]",
        },
      ],
      aboutMe: [
        {
          keyword: "문제 발견과 해결",
          description: "문제의 발견과 해결..(상세 내용)",
        },
        {
          keyword: "논리성과 분석력",
          description: "논리성과 분석력..(상세 내용)",
        },
        {
          keyword: "시각적 표현",
          description: "시각적 표현..(상세 내용)",
        },
        {
          keyword: "정직함과 책임감",
          description: "정직함과 책임감..(상세 내용)",
        },
        {
          keyword: "쉽고 편한 디자인",
          description: "쉽고 편한 디자인..(상세 내용)",
        },
        {
          keyword: "공감과 경청",
          description: "공감과 경청..(상세 내용)",
        },
        {
          keyword: "디자인 도구 활용",
          description: "디자인 도구 활용..(상세 내용)",
        },
        {
          keyword: "설명과 설득력",
          description: "설명과 설득력..(상세 내용)",
        },
      ],
    },
  },
];

// {
//   "categoryId": "카테고리-UUID",
//   "content": {
//     "contentTitle": "UIUX Project",
//     "description": "스스로 시작한 다양한 프로젝트를 모았습니다.",
//     "projects": [
//       {
//         "projectName": "프로젝트 이름",
//         "logoImage": { "src": "/asset/image/Logo.png" },
//         "projectDescription": "프로젝트 설명...",
//         "date": "2025.02 ~ 2025.07",
//         "stacks": [
//           { "stackName": "Figma", "stackLogo": "/file.svg" }
//         ],
//         "projectImage": { "src": "/asset/image/Logo_Image.png" },
//         "Participation": 54
//       }
//     ]
//   }
// }

//카테고리 타입 Profile 섹션 템플릿

// {
//   "categoryId": "카테고리-UUID",
//   "content": {
//     "contentTitle": "kim yurim Designer PORTFOLIO",
//     "shortIntro": "안녕하세요. 사용자와 함께 성장하는 프로덕트 디자이너, 김유림 입니다.",
//     "contact": {
//       "mbti": "INTJ",
//       "birthDate": "2001.03.01",
//       "phone": "010-7339-1682",
//       "email": "dbflal22@naver.com"
//     },
//     "information": [
//       {
//         "title": "학력사항",
//         "items": [
//           {
//             "description": "울산과학대학교 졸업(사회복지학과)",
//             "period": "2020.03 ~ 2023.02"
//           }
//         ]
//       },
//       {
//         "title": "경력사항",
//         "items": [
//           {
//             "description": "(주)루토닉스 디자인팀",
//             "period": "2024.12 ~ ing"
//           },
//           {
//             "description": " (주)비팩토리 디자인팀",
//             "period": "2022.11 ~ 2023.05"
//           }
//         ]
//       },
//       {
//         "title": "교육",
//         "items": [
//           {
//             "description": "스나이퍼팩토리[ UI/UX 인턴형 프로그램 6기 ]",
//             "period": "2024.10 ~ 2024.12"
//           },
//           {
//             "description": "SBS아카데미컴퓨터아트학원[ UIUX 퍼블리셔 웹학과 심화교육 ]",
//             "period": "2023.09 ~ 2024.07"
//           },
//           {
//             "description": "울산그린컴퓨터아카데미[ 반응형 웹 디자인(UIUX) & 웹퍼블리셔(코딩) 실무 양성과정 ]",
//             "period": "2022.03 ~ 2022.07"
//           }
//         ]
//       }
//     ],
//     "skills": [
//       {
//         "name": "Figma",
//         "level": 4,
//         "description": "[ 프로토타입 제작 및 팀 협업 경험 ]"
//       },
//       {
//         "name": "Adobe XD",
//         "level": 2,
//         "description": "[ 와이어프레임 및 인터랙션 설계 시안 제작 가능 ]"
//       },
//       {
//         "name": "Adobe Photoshop / Illustrator",
//         "level": 4,
//         "description": "[ 상세페이지, 브랜딩 디자인 실무 경험 ]"
//       },
//       {
//         "name": "HTML5 / CSS",
//         "level": 3.5,
//         "description": "[ 반응형 웹 퍼블리싱 기본 구현 가능 ]"
//       },
//       {
//         "name": "javaScript",
//         "level": 2,
//         "description": "[ 인터랙션 기초 수준 ]"
//       },
//       {
//         "name": "WordPress",
//         "level": 2,
//         "description": "[ 템플릿 커스터마이징 및 콘텐츠 관리 가능 ]"
//       }
//     ],
//   "aboutMe": [
//     {
//       "keyword": "문제 발견과 해결",
//       "description": "문제의 발견과 해결..(상세 내용)"
//     },
//     {
//       "keyword": "논리성과 분석력",
//       "description": "논리성과 분석력..(상세 내용)"
//     },
//     {
//       "keyword": "시각적 표현",
//       "description": "시각적 표현..(상세 내용)"
//     },
//     {
//       "keyword": "정직함과 책임감",
//       "description": "정직함과 책임감..(상세 내용)"
//     },
//     {
//       "keyword": "쉽고 편한 디자인",
//       "description": "쉽고 편한 디자인..(상세 내용)"
//     },
//     {
//       "keyword": "공감과 경청",
//       "description": "공감과 경청..(상세 내용)"
//     },
//     {
//       "keyword": "디자인 도구 활용",
//       "description": "디자인 도구 활용..(상세 내용)"
//     },
//     {
//       "keyword": "설명과 설득력",
//       "description": "설명과 설득력..(상세 내용)"
//     }

// ]
//   }
// }
