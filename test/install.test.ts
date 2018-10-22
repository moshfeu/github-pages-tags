import * as fm from '../src/file-modifier';

function init() {

}

describe('install', () => {
  it('should do the flow', () => {
    jest.spyOn(fm, 'read').mockImplementation(() => {
      console.log('read!!');
      return {};
    });
    jest.spyOn(fm,'addProps');
    jest.spyOn(fm, 'save');
    require('../src/install');

    expect(fm.read).toHaveBeenCalled();
    // expect(fm.addProps).toHaveBeenCalledWith({});
    expect(fm.save).toHaveBeenCalled();

    expect((<jest.Mock>fm.save).mock.calls[0][0]).toEqual({
      "pre-commit": ["generate-tags"],
      "scripts": {
        "generate-tags": "node node_modules/github-pages-tags/precommit.js"
      }
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});