import { TrimPipe } from './trim.pipe';

describe('TrimPipe', () => {
  let pipe: TrimPipe;

  beforeEach(() => {
    pipe = new TrimPipe();
  });

  it('trims string values', () => {
    expect(
      pipe.transform('  hello  ', { type: 'body', metatype: String }),
    ).toBe('hello');
  });

  it('trims strings inside arrays', () => {
    expect(
      pipe.transform([' one ', ' two '], { type: 'body', metatype: Array }),
    ).toEqual(['one', 'two']);
  });

  it('trims nested object string values', () => {
    expect(
      pipe.transform(
        { name: ' Alice ', email: ' alice@example.com ' },
        { type: 'body', metatype: Object },
      ),
    ).toEqual({
      name: 'Alice',
      email: 'alice@example.com',
    });
  });

  it('preserves non-string values', () => {
    expect(
      pipe.transform(
        { age: 30, active: true },
        { type: 'body', metatype: Object },
      ),
    ).toEqual({
      age: 30,
      active: true,
    });
  });

  it('returns primitive non-string values unchanged', () => {
    expect(pipe.transform(42, { type: 'body', metatype: Number })).toBe(42);
    expect(pipe.transform(null, { type: 'body', metatype: null })).toBeNull();
    expect(
      pipe.transform(undefined, { type: 'body', metatype: undefined }),
    ).toBeUndefined();
  });
});
