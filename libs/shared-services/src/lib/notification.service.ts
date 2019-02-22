import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

/**
 * Core service responsible for sending notification to user
 */
@Injectable()
export class NotificationService {

    static STATUS_SUCCESS = 'success';
    static STATUS_INFO = 'info';
    static STATUS_WARNING = 'warning';
    static STATUS_ERROR = 'error';

    constructor(private toastrManager: ToastsManager,
                private translateService: TranslateService) {}

    /**
     * Show appropriate toast notification with translated message.
     * @param {string} message String key for translation.
     * @param status String value from static STATUSES.
     * @param {Object} [{}] translationParams - (optional)
     */
    show(toastData: { message: string, status: string, options: Object }, translationParams: Object = {}): Promise<Toast> {
        return this.showMessage(toastData, translationParams );
    }

    /**
     * Show success toast notification with translated message.
     * @param message String key for translation.
     */
    success(message: string, options = {}, translationParams: Object = {}): Promise<Toast> {
        return this.showMessage(
            {
                message,
                status: NotificationService.STATUS_SUCCESS,
                options
            },
            translationParams
        );
    }

    /**
     * Show error toast notification with translated message.
     * @param message String key for translation.
     */
    error(message: string, options = {}, translationParams: Object = {}): Promise<Toast> {
        return this.showMessage(
            {
                message,
                status: NotificationService.STATUS_ERROR,
                options
            },
            translationParams
        );
    }

    /**
     * Show warning toast notification with translated message.
     * @param message String key for translation.
     */
    warning(message: string, options = {}, translationParams: Object = {}): Promise<Toast> {
        return this.showMessage(
            {
                message,
                status: NotificationService.STATUS_WARNING,
                options
            },
            translationParams
        );
    }

    /**
     * Show info toast notification with translated message.
     * @param message String key for translation.
     * @param translationParams Object for translation
     */
    info(message: string, options = {}, translationParams: Object = {}): Promise<Toast> {
        return this.showMessage(
            {
                message,
                status: NotificationService.STATUS_INFO,
                options
            },
            translationParams
        );
    }

    dismissToast(toast: Toast): void {
        this.toastrManager.dismissToast(toast);
    }

    private showMessage({ message, status, options }:
            { message: string, status: string, options: Object }, translationParams: Object) {
        return new Promise<Toast>((resolve, reject) => {
            this.translateService
                .get(message, translationParams)
                .subscribe(
                    translate => resolve(this.statusHandling({ message: translate, status, options })),
                    error => reject(this.errorHandling(error))
                );
        });
    }

    private statusHandling = ({ message, status, options }:
            { message: string, status: string, options: Object  }): Promise<Toast> => {
        const toast = new Toast(
            status,
            message
        );
        return this.toastrManager.show(toast, options);
    }

    private errorHandling = (error): void => {
        console.error(error);
    }
}
