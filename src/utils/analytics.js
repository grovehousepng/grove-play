export const trackContactClick = (method, location, serviceName) => {
    if (window.dataLayer) {
        window.dataLayer.push({
            'event': 'contact_interaction',
            'contact_method': method,
            'button_location': location,
            'service_interest': serviceName || document.title
        });
    }
};

export const trackFormSubmit = (formName, userData, serviceName) => {
    if (window.dataLayer) {
        window.dataLayer.push({
            'event': 'generate_lead',
            'form_name': formName,
            'service_interest': serviceName || document.title,
            'user_data': {
                'email_address': userData.email,
                'phone_number': userData.phone
            }
        });
    }
};
