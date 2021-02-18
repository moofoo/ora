import test from 'ava';
import Ora from '.';
import TransformTTY from 'transform-tty';

test('indent + text > columns', t => {
	const transformTTY = new TransformTTY({columns: 20});

	const spinner = new Ora({
		text: 'foo',
		color: false,
		isEnabled: true,
		stream: transformTTY,
		spinner: {
			frames: ['-']
		}
	});

	spinner.render();

	spinner.text = 'foo\nbar';
	spinner.render();

	t.is(transformTTY.toString(), '- foo\nbar'); // 2 lines
	t.is(spinner.lineCount, 2); // 2

	spinner.text = '0'.repeat(transformTTY.columns - 5);
	spinner.indent = 15;
	spinner.render();

	t.is(transformTTY.toString(), '               - 000\n000000000000'); // Also 2 lines
	t.is(spinner.lineCount, 2); // not 2

	// Fails because lineCount = 1, since updateLineCount doesn't factor in spinner.indent
});