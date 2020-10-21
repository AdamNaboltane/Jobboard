import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
    const pipe = new TruncatePipe();

    it('should not truncate text before 25 characters', () => {
        expect(pipe.transform('This is a long text, this')).toBe('This is a long text, this');
    });

    it('should truncate text after 25 characters', () => {
        expect(pipe.transform('This is a long text, this is a long text.')).toBe('This is a long text, this...');
    });

    it('should truncate text at x characters', () => {
        expect(pipe.transform('This is a long text, this is a long text.', 30)).toBe('This is a long text, this is a...');
    });

    it('should not truncate text before x characters', () => {
        expect(pipe.transform('This is a long text, this is a', 30)).toBe('This is a long text, this is a');
    });

    it('should truncate text before a full word', () => {
        expect(pipe.transform('This is a long text, this is a long text.', 23, true)).toBe('This is a long text,...');
    });

    it('should truncate text and word', () => {
        expect(pipe.transform('should truncate text and word', 23, false)).toBe('should truncate text an...');
    });

    it('should be able to change ellipsis', () => {
        expect(pipe.transform('This is a long text, this is a long text.', 25, false, '@@@')).toBe('This is a long text, this@@@');
    });
});
