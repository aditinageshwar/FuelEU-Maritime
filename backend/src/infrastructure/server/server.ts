import express from 'express';
import { RouteController } from '../../adapters/inbound/http/RouteController';
import { ComplianceController } from '../../adapters/inbound/http/ComplianceController';
import { BankingController } from '../../adapters/inbound/http/BankingController';
import { PoolingController } from '../../adapters/inbound/http/PoolingController';
import { PostgreSQLRouteRepository } from '../../adapters/outbound/postgres/RouteRepository';
import { PostgreSQLComplianceRepository } from '../../adapters/outbound/postgres/ComplianceRepository';
import { PostgreSQLBankingRepository } from '../../adapters/outbound/postgres/BankingRepository';
import { PostgreSQLPoolingRepository } from '../../adapters/outbound/postgres/PoolingRepository';
import { CalculateComplianceBalance } from '../../core/application/CalculateComplianceBalance';
import { ProcessBankingTransaction } from '../../core/application/ProcessBankingTransaction';
import { CreatePooling } from '../../core/application/CreatePooling';
import { GetRoute } from '../../core/application/GetRoute';
import { DeleteRoute } from '../../core/application/DeleteRoute';
import prisma from '../db/config';

const app = express();
app.use(express.json());

// Repositories (outbound adapters)
const routeRepo = new PostgreSQLRouteRepository();
const complianceRepo = new PostgreSQLComplianceRepository();
const bankingRepo = new PostgreSQLBankingRepository();
const poolingRepo = new PostgreSQLPoolingRepository();

// Use cases (application layer)
const calculateCB = new CalculateComplianceBalance(routeRepo, complianceRepo);
const processTransaction = new ProcessBankingTransaction(bankingRepo);
const createPooling = new CreatePooling(poolingRepo);
const getRoute = new GetRoute(routeRepo);
const deleteRoute = new DeleteRoute(routeRepo);

// Controllers (inbound adapters)
const routeController = new RouteController(routeRepo, getRoute, deleteRoute);
const complianceController = new ComplianceController(calculateCB);
const bankingController = new BankingController(processTransaction, bankingRepo);
const poolingController = new PoolingController(createPooling, poolingRepo);

// Routes
app.get('/api/routes', routeController.getAll.bind(routeController));
app.get('/api/routes/:id', routeController.getById.bind(routeController));
app.post('/api/routes', routeController.create.bind(routeController));
app.delete('/api/routes/:id', routeController.delete.bind(routeController));

app.post('/api/compliance/calculate', complianceController.calculate.bind(complianceController));

app.get('/api/banking/:vesselId', bankingController.getByVessel.bind(bankingController));
app.post('/api/banking/transaction', bankingController.createTransaction.bind(bankingController));

app.get('/api/pooling/:vesselId', poolingController.getByVessel.bind(poolingController));
app.post('/api/pooling', poolingController.create.bind(poolingController));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
