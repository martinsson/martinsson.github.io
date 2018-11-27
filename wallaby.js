module.exports = w => ({
    files: [
        'retours/**/*.*',
        '!retours/**/*.spec.ts'
    ],

    tests: [
        'retours/**/*.spec.ts'
    ],

    env: {
        type: 'node'
    }
});
