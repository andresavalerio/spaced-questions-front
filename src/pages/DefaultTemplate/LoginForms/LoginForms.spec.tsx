import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'

import LoginForms from './LoginForms'

describe('Validating the rules for Cadastration of new User', () => {
    it('Should render the inputs of the forms', () => {
        render(<LoginForms/>);

        const nameInput = screen.getByRole('name-input')

        expect(nameInput).toBeInTheDocument();
    })
})