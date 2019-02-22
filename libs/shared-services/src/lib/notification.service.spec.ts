import { Observable } from 'rxjs/Observable';
import { TestBed, async, inject } from '@angular/core/testing';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { TranslateService } from '@ngx-translate/core';

import { NotificationService } from './notification.service';

describe('Service: NotificationService', () => {
    const translate = 'translate';
    const errorTranslate = 'error-translate';
    let service, toastsManager, translateService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                NotificationService,
                {
                    provide: ToastsManager,
                    useValue: {
                        show: (toast, options) => {},
                        dismissToast: (toast) => {}
                    }
                },
                {
                    provide: TranslateService,
                    useValue: {
                        get: (text): any => {
                            if (text === 'to-translate') {
                                return Observable.of(translate);
                            }
                            return Observable.throw(errorTranslate);
                        },
                        onTranslationChange: {
                            subscribe: () => {}
                        },
                        onLangChange: {
                            subscribe: () => {}
                        },
                        onDefaultLangChange: {
                            subscribe: () => {}
                        }
                    }
                }
            ]
        });
        service = TestBed.get(NotificationService);
        toastsManager = TestBed.get(ToastsManager);
        translateService = TestBed.get(TranslateService);
    });

    it('should create NotificationService', () => {
        expect(service).toBeTruthy();
      });

    it('should handle show method', () => {
        const result = new Toast(NotificationService.STATUS_SUCCESS, translate);
        jest.spyOn(toastsManager, 'show');
        service
            .show({
                message: 'to-translate',
                status: NotificationService.STATUS_SUCCESS,
                options: {} }
            ).then(
                success => {},
                error => {}
            );
        expect(toastsManager.show).toHaveBeenCalledWith(result, {});
    });

    it('should handle success method', () => {
        const result = new Toast(NotificationService.STATUS_SUCCESS, translate);
        jest.spyOn(toastsManager, 'show');
        service.success('to-translate').then(
            success => {},
            error => {}
        );
        expect(toastsManager.show).toHaveBeenCalledWith(result, {});
    });

    it('should handle error method', () => {
        const result = new Toast(NotificationService.STATUS_ERROR, translate);
        jest.spyOn(toastsManager, 'show');
        service.error('to-translate').then(
            success => {},
            error => {}
        );
        expect(toastsManager.show).toHaveBeenCalledWith(result, {});
    });

    it('should handle warning method', () => {
        const result = new Toast(NotificationService.STATUS_WARNING, translate);
        jest.spyOn(toastsManager, 'show');
        service.warning('to-translate').then(
            success => {},
            error => {}
        );
        expect(toastsManager.show).toHaveBeenCalledWith(result, {});
    });

    it('should handle info method', () => {
        const result = new Toast(NotificationService.STATUS_INFO, translate);
        jest.spyOn(toastsManager, 'show');
        service.info('to-translate').then(
            success => {},
            error => {}
        );
        expect(toastsManager.show).toHaveBeenCalledWith(result, {});
    });

    it('should handle translation error', () => {
        const result = new Toast(NotificationService.STATUS_SUCCESS, translate);
        jest.spyOn(toastsManager, 'show');
        service.success('error').then(
            success => {},
            error => {}
        );
        expect(toastsManager.show).not.toHaveBeenCalledWith(result, {});
    });

    it('should dismiss toast', () => {
        let result;
        jest.spyOn(toastsManager, 'dismissToast');
        service.success('test').then(
            (toast: Toast) => result = toast,
            error => {}
        );
        service.dismissToast(result);
        expect(toastsManager.dismissToast).toHaveBeenCalledWith(result);
    });

});
