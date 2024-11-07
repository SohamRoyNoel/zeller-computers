import { main } from '../src/index';

jest.mock('readline');

describe('Main Application', () => {
    let mockInterface: any;
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        mockInterface = {
            question: jest.fn(),
            close: jest.fn()
        };
        require('readline').createInterface = jest.fn(() => mockInterface);
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should scan products and display total amount when "c" is entered', () => {
        mockInterface.question
            .mockImplementationOnce((_: string, callback: (input: string) => void) => callback('ipd'))
            .mockImplementationOnce((_: string, callback: (input: string) => void) => callback('atv'))
            .mockImplementationOnce((_: string, callback: (input: string) => void) => callback('c'));

        main();

        expect(mockInterface.question).toHaveBeenCalledTimes(3);

        expect(consoleSpy).toHaveBeenNthCalledWith(2, 'scanned. Total: $549.99');
        expect(consoleSpy).toHaveBeenNthCalledWith(4, 'scanned. Total: $659.49');

        expect(consoleSpy).toHaveBeenNthCalledWith(5, 'Total: $659.49');
        
        expect(mockInterface.close).toHaveBeenCalled();
    });

    test('should handle if SKU input is invalid', () => {
        mockInterface.question
            .mockImplementationOnce((_: string, callback: (input: string) => void) => callback('uuu'))
            .mockImplementationOnce((_: string, callback: (input: string) => void) => callback('c'));

        main();

        expect(mockInterface.question).toHaveBeenCalledTimes(2);
        expect(consoleSpy).toHaveBeenCalledWith('Product uuu not found.');
        expect(consoleSpy).toHaveBeenCalledWith(`Total: $0.00`);
        expect(mockInterface.close).toHaveBeenCalled();
    });
});
