// -- 
// Esse arquivo serve para validar os dados
// -- 

const validateFieldBody = (request, response, next) => {
    const {body} = request;

    if (body.title === undefined) {
        return response.status(400).json({message: 'The field title is required'});
    }

    if (body.title === '' || body.title === ' ') {
        return response.status(400).json({ message: 'The Field title cannot be empty' });
    }

    // Passar para o próximo
    next();
};

const validateFieldStatus = (request, response, next) => {
    const { body } = request;

    if (body.status === undefined) {
        return response.status(400).json({ message: 'The field status is required' });
    }

    if (body.status === '' || body.status === ' ') {
        return response.status(400).json({ message: 'The Field status cannot be empty' });
    }
    // Passar para o próximo
    next();
};


// Define quais métodos devem ser exportados
module.exports = {
    validateFieldBody,
    validateFieldStatus
};