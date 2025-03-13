process.env.NODE_ENV = 'test';
import { test } from '@playwright/test';
import health from './health.test';
import userTestCollection from './user.test';

import { userModel } from '../src/models/User';
import { productModel } from '../src/models/Product';

import dotenvFlow from 'dotenv-flow';
import { connect, disconnect } from '../src/repository/database';
dotenvFlow.config();

function setUp() {
    //beforeEach clear test database
    test.beforeEach (async () => {
        try {
            await connect();
            await userModel.deleteMany();
            await productModel.deleteMany();
        }
        finally {
            await disconnect();
        }
    })

    //afterAll clear test database
    test.afterAll (async () => {
        try {
            await connect();
            await userModel.deleteMany();
            await productModel.deleteMany();
        }
        finally {
            await disconnect();
        }
    })
}

setUp();
test.describe(health);
test.describe(userTestCollection);
