'use strict';

const hasOwn = {}.hasOwnProperty;

function classNames(...args) {
    const classes = [];

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (!arg) continue;

        const argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (Array.isArray(arg)) {
            if (arg.length) {
                // eslint-disable-next-line prefer-spread
                const inner = classNames.apply(null, arg);
                if (inner) {
                    classes.push(inner);
                }
            }
        } else if (argType === 'object') {
            if (
                arg.toString !== Object.prototype.toString &&
                !arg.toString.toString().includes('[native code]')
            ) {
                classes.push(arg.toString());
                continue;
            }

            for (const key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push(key);
                }
            }
        }
    }

    return classes.join(' ');
}

export default classNames;

// taken from https://github.com/JedWatson/classnames, and as so, it is licensed under the MIT license:
//
// The MIT License (MIT)
//
// Copyright (c) 2018 Jed Watson
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
