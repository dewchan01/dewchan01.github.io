import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { faCircleNotch, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'pw-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  animations: [
    trigger('toggleAnswer', [
      state('visible', style({
        height: '*',
        opacity: 1,
        overflow: 'hidden'
      })),
      state('hidden', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden'
      })),
      transition('visible => hidden', animate('1000ms ease-in-out')),
      transition('hidden => visible', animate('1000ms ease-in-out'))
    ])
  ]
})

export class FaqComponent implements OnInit, AfterViewInit {
  boxShadow: string = '';
  faPowerOff = faPowerOff;
  faCircleNotch = faCircleNotch;
  techStacks = '';

  constructor(private homeComponent: HomeComponent) { }
  @ViewChild('container', { static: false }) container!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    const paragraphs = this.container.nativeElement.querySelectorAll('li');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    });

    paragraphs.forEach(paragraph => {
      observer.observe(paragraph);
    });
  }

  public showAnswerAnimation = 'hide';

  public faq: { question: string, answer: string[], showAnswer: boolean }[] = [
    {
      question: 'Cloud Stack 🌩️ ',
      answer: [
        "https://skillicons.dev/icons?i=docker,kubernetes,aws",
        // 'https://img.shields.io/badge/-MinIO-00ADD8?style=for-the-badge&logo=min.io&logoColor=white',
        // 'https://img.shields.io/badge/-Helm-277A9F?style=for-the-badge&logo=helm&logoColor=white'
      ],
      showAnswer: false
    },
    {
      question: 'Front-end App Development 🖥️',
      answer: [
        "https://skillicons.dev/icons?i=html,css,js,ts,angular,nodejs",
        // "https://img.shields.io/badge/-GreenSock-88CE02?style=for-the-badge&logo=greensock&logoColor=white"
      ],
      showAnswer: false

    },
    {
      question: 'Back-end App Development ⚙️',
      answer: [
        "https://skillicons.dev/icons?i=nestjs,sqlite,mysql,postgres,redis,mongodb",
        // "https://img.shields.io/badge/-TypeORM-E83524?style=for-the-badge&logo=typeorm&logoColor=white",
        // "https://img.shields.io/badge/-Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black",
        // "https://img.shields.io/badge/-OpenAPI-6BA539?style=for-the-badge&logo=openapi-initiative&logoColor=white"
      ],
      showAnswer: false
    },
    {
      question: 'IoT 🌐',
      answer: [
        "https://skillicons.dev/icons?i=arduino,gcp"
      ],
      showAnswer: false

    },
    {
      question: 'Unity Pixel Game 🎮',
      answer: [
        "https://skillicons.dev/icons?i=unity,cs,azure,ps,pr",
      ],
      showAnswer: false
    },
    {
      question: 'DevOps Collaboration and Version Control 🚀',
      answer: [
        "https://skillicons.dev/icons?i=git,github",
        // "https://img.shields.io/badge/-Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white",
        // "https://img.shields.io/badge/-Bitbucket-0052CC?style=for-the-badge&logo=bitbucket&logoColor=white",
        // "https://img.shields.io/badge/-Confluence-172B4D?style=for-the-badge&logo=confluence&logoColor=white"
      ],
      showAnswer: false
    },
    {
      question: 'Monitoring & Performance & Testing ⚡',
      answer: [
        "https://skillicons.dev/icons?i=postman,jest,jenkins,grafana,prometheus",
        // "https://img.shields.io/badge/-InfluxDB-22ADF6?style=for-the-badge&logo=influxdb&logoColor=white",
        // "https://img.shields.io/badge/-K6-000000?style=for-the-badge&logo=k6&logoColor=white"
      ],
      showAnswer: false
    },
    {
      question: 'AI/ML 🤖',
      answer: [
        "https://skillicons.dev/icons?i=py,selenium,tensorflow",
        // "https://img.shields.io/badge/-Jupyter%20Notebook-F37626?style=for-the-badge&logo=jupyter&logoColor=white",
        // "https://img.shields.io/badge/-OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white"

      ],
      showAnswer: false
    },
    {
      question: 'CMS Platforms 📝',
      answer: [
        "https://skillicons.dev/icons?i=wordpress",
        // "https://img.shields.io/badge/-Adobe%20Experience%20Manager%20(AEM)-FF0000?style=for-the-badge&logo=adobe&logoColor=white"

      ],
      showAnswer: false
    },
    {
      question: 'Other Languages 🌐',
      answer: [
        "https://skillicons.dev/icons?i=go,c",
        // "https://img.shields.io/badge/-Adobe%20Experience%20Manager%20(AEM)-FF0000?style=for-the-badge&logo=adobe&logoColor=white"

      ],
      showAnswer: false
    }
  ];

  ngOnInit(): void {
    if (this.homeComponent.isWebView) {
      this.techStacks = 'Tech<br>Stacks'
    } else {
      this.techStacks = 'Tech Stacks'
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const scrollTop = event.target.documentElement.scrollTop;
    let newScrollTop = scrollTop - 600
    if (newScrollTop >= 200 && newScrollTop <= 800 && this.homeComponent.isWebView) {
      const shadowSpread = newScrollTop / 40; // adjust this value to control the amplitude
      const opacity = newScrollTop / 2000; // adjust this value to control the opacity
      this.boxShadow = `0 0 ${shadowSpread}px ${shadowSpread / 2}px rgba(255,255,255,${opacity}),
        0 0 ${shadowSpread + 20}px ${shadowSpread / 2 + 10}px rgba(255,255,255,${opacity}),
        0 0 ${shadowSpread + 40}px ${shadowSpread / 2 + 20}px rgba(255,255,255,${opacity}),
        0 0 ${shadowSpread + 60}px ${shadowSpread / 2 + 30}px rgba(255,255,255,${opacity})`;

    } else if (newScrollTop > 800 && this.homeComponent.isWebView) {
      const shadowSpread = 800 / 40 - (newScrollTop - 800) / 40; // adjust this value to control the amplitude
      const opacity = 800 / 2000 - (newScrollTop - 800) / 2000; // adjust this value to control the opacity
      this.boxShadow = `0 0 ${shadowSpread}px ${shadowSpread / 2}px rgba(255,255,255,${opacity}),
        0 0 ${shadowSpread + 20}px ${shadowSpread / 2 + 10}px rgba(255,255,255,${opacity}),
        0 0 ${shadowSpread + 40}px ${shadowSpread / 2 + 20}px rgba(255,255,255,${opacity}),
        0 0 ${shadowSpread + 60}px ${shadowSpread / 2 + 30}px rgba(255,255,255,${opacity})`;
    } else if (this.homeComponent.isWebView) {
      this.boxShadow = '';
    } else {
      this.boxShadow = `0 0 20px 10px rgba(255, 255, 255, 0.5),
        0 0 40px 20px rgba(255, 255, 255, 0.3),
        0 0 60px 30px rgba(255, 255, 255, 0.2),
        0 0 80px 40px rgba(255, 255, 255, 0.1);`
    }
  }

  toggleAnswer(index: number) {
    this.faq[index].showAnswer = !this.faq[index].showAnswer;
  }


}
