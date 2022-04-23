import { getRepository } from "typeorm";
import { StockKeepingUnit } from "../entities/stockKeepingUnit/stockKeepingUnit.entity";
import { CreateAddressInput } from "address/CreateAddress.input";
import { CreateAddressOutput } from "address/CreateAddress.output";
import { Address } from "../entities/address/address.entity";
import { User } from "../entities/user/user.entity";

const create = async (input: CreateAddressInput): Promise<CreateAddressOutput> => {
  const addressRepository = getRepository(Address);
  const userRepository = getRepository(User);

  try {
    let res: CreateAddressOutput = { success: false };
    
    let user = await userRepository.findOne(input.user_id);
    if (!user) return res;

    let address = new Address();
    address = { ...input, ...address };
    address.user = user;
    address = await addressRepository.save(address);

    res.success = true;
    res.address = address;
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  create,
};
