import { BrandingOptions as IBrandingOptions } from "adminjs"


class BrandingOptions {
    private _options: IBrandingOptions = {
        companyName: 'Community',
            theme: {
            colors: {
                primary100: '#004aad',
                primary80: '#ff1a57',
                primary60: '#ff3369',
                primary40: '#ff4d7c',
                primary20: '#ff668f',
                grey100: '#151515',
                grey80: '#333333',
                grey60: '#4d4d4d',
                grey40: '#666666',
                grey20: '#dddddd',
                filterBg: '#333333',
                accent: '#151515',
                hoverBg: '#151515',
            },
            
        },
        withMadeWithLove: false,
    }

    public getOptions() {
        return this._options
    }
}

export default new BrandingOptions();
