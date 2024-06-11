import { informationCircle } from 'ionicons/icons';
import { toastController } from '@ionic/vue';
import { close } from 'ionicons/icons';
import { getCurrentInstance, nextTick, inject } from 'vue'
import { useRoute } from 'vue-router';
import { alertController } from '@ionic/vue';
import { i18n } from '@/main';

/* UI COMPONENTS */

export async function presentToast(message:string, color:string='success', icon=informationCircle){
    if(typeof(message) !== 'string' ) message = i18n.global.t('An error occured')

    const toast = await toastController.create({
        message: message,
        duration: 2500,
        position: 'bottom',
        color: color,
        icon: icon,
        buttons: [{icon: close,}]
    });
    await toast.present();
}

export function showIonInputError(elementRef:any, condition:any):any{
    elementRef.value.$el.classList.remove('ion-valid');
    elementRef.value.$el.classList.remove('ion-invalid');

    if(typeof(condition) === 'function'){
        condition = condition();
    }

    if(typeof(condition) == 'boolean'){
        if (condition){
            elementRef.value.$el.classList.add('ion-invalid');
        }
        else{
            elementRef.value.$el.classList.add('ion-valid')
        }
        elementRef.value.$el.classList.add('ion-touched')

        return condition;
    }
    return undefined;
}

export function focusInput(inputRef:any){
    nextTick(() => {
        setTimeout(() => { // trick to focus with Ionic6
            inputRef.value.$el.setFocus();
        }, 10);
    });
}


export async function confirmAlert(alertParams:any){
    const alert = await alertController.create(alertParams);
    
    await alert.present();
    const { role } = await alert.onDidDismiss();
    
    return role == 'confirm';
}

export async function confirmDeletion():Promise<boolean>{
    // IMPORTANT: i18n must me passed as argument to prevent this error : "Must be called at the top of a `setup` function"
    return await confirmAlert({
        header: i18n.global.t('Confirm deletion ?'),
        mode: 'ios',
        buttons: [
            { text: i18n.global.t('Yes'), role: 'confirm' },
            { text: i18n.global.t('No'), role: 'cancel' },
        ]
    });
}


/* UTILS FUNCTIONS */

export async function downloadFile(blob:any, filename:string){
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.setAttribute("download", filename);
    a.click();
}

export function waitElVisible(callback:Function){
    nextTick(() => {
        setTimeout(() => { // make sure element appear
            callback();
        }, 30);
    });
}

// Used to refresh page DATA through Vue3 onUpdated method
// Vue3 onUpdated method could be triggered on another page so :
//   * it only refresh data if the current components match with current route
//   * it only refresh once remembering last refresh trought `lastRefreshedRoute` variable
export var lastRefreshedRoute:string = '';
export function refreshData(callback:Function){
    const route = useRoute();
    const componentName:any = getCurrentInstance()?.type.__name
    if(route.name == componentName && componentName != lastRefreshedRoute){
        callback()
    }
    lastRefreshedRoute = componentName;
}

