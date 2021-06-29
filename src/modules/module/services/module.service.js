import { logger } from "../../../utils/logger";
import modulePGRepository from "../repositories/module.pg.repository";

const moduleService = {};
const context = "Module Service";

moduleService.getInfo = async () => {
    logger.info(`[${context}]: Consulting the data sources`);
    const info = await modulePGRepository.getData();
    return info;
};

export default moduleService;