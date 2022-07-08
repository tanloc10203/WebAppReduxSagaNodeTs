import {
  Attributes,
  CreationAttributes,
  FindOptions,
  FindOrCreateOptions,
  Includeable,
  Op,
  Optional,
} from 'sequelize';
import { Model, ModelCtor } from 'sequelize/types';
import { FilterPayload } from '../utils';

export class DbQuery {
  private declare readonly Db: ModelCtor<Model<any, any>>;

  constructor(Db: ModelCtor<Model<any, any>>) {
    this.Db = Db;
  }

  public handleFindAndCreate(
    options: FindOrCreateOptions<Attributes<Model>, CreationAttributes<Model>>
  ) {
    return this.Db.findCreateFind(options);
  }

  public handleFind(options: FindOptions<Attributes<Model>>) {
    return this.Db.findOne(options);
  }

  public handleCreate<T>(data: T, options?: FindOptions<Attributes<Model>>) {
    return this.Db.create({
      ...(data as Optional<any, string>),
    });
  }

  public handleGetAll() {
    return this.Db.findAll();
  }

  public handleGetAllAndFilter(filter: FilterPayload) {
    let { _limit, _page, _order, _name, name_like, ...others } = filter;

    return this.Db.findAndCountAll({
      where: {
        ...others,
        [`${_name}`]: {
          [Op.like]: `%${name_like || ''}%`,
        },
      },
      limit: _limit,
      offset: _limit * _page,
      order: [[`${_name || 'id'}`, `${_order || 'ASC'}`]],
    });
  }

  public handleGetAllAndFilterByIncludes(
    filter: FilterPayload,
    includes?: Includeable | Array<Includeable>
  ) {
    let { _limit, _page, _order, _name, name_like, ...others } = filter;

    return this.Db.findAndCountAll({
      where: {
        ...others,
        name: {
          [Op.like]: `%${name_like || ''}%`,
        },
      },
      limit: _limit,
      offset: _limit * _page,
      order: [[`${_name || 'id'}`, `${_order || 'ASC'}`]],
      include: includes,
    });
  }

  public handleUpdate<T>(id: number, data: T) {
    return this.Db.update({ ...data }, { where: { id: id } });
  }

  public handleGetById(id: number) {
    return this.Db.findByPk(id);
  }

  public getDb() {
    return this.Db;
  }
}
