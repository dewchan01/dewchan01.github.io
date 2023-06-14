/*
 * Copyright Keysight Technologies, All Rights Reserved
 * Keysight Confidential
 */

// External imports
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

// Keysight imports
import { AlloyButtonModule, AlloyLabelModule } from '@keysight/alloy';

// Internal imports
import { HelloWorldComponent } from './prizes.component';
import { VersionService } from '../services/version.service';

describe('HelloWorldComponent', () => {
    let component: HelloWorldComponent;
    let fixture: ComponentFixture<HelloWorldComponent>;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [ HelloWorldComponent ],
            imports: [ HttpClientModule, AlloyButtonModule, AlloyLabelModule ],
            providers: [ VersionService ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HelloWorldComponent);
        const versionService = TestBed.inject(VersionService);
        spyOn(versionService, 'getMicroServiceVersion').and.returnValue(of('0'));
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
