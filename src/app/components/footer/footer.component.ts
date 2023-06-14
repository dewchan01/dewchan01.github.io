import { Component, OnInit } from '@angular/core';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'pw-footer',
    templateUrl: './footer.component.html',
    styleUrls: [ './footer.component.scss' ]
})

export class FooterComponent implements OnInit {
    public faEnvelope = faEnvelope;
    public faGithub = faGithub;
    public faLinkedIn = faLinkedinIn;

    constructor() {}
    ngOnInit(): void {}
}
