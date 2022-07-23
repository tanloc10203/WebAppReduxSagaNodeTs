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

  public handleGetAll(options?: FindOptions<Attributes<Model>>) {
    return this.Db.findAll(options);
  }

  public handleGetAllAndFilter(filter: FilterPayload) {
    let { _limit, _page, _order, name_query, name_order, name_like, ...others } = filter;

    if (parseInt(name_like as string)) name_like = parseInt(name_like as string) as number;

    return this.Db.findAndCountAll({
      where: {
        ...others,
        [`${name_query}`]: {
          [name_like ? Op.like : Op.not]: name_like ? `%${name_like}%` : null,
        },
      },
      limit: _limit,
      offset: _limit * _page,
      order: [[`${name_order || 'id'}`, `${_order || 'ASC'}`]],
    });
  }

  public handleBulkCreate<T>(data: Array<T>) {
    // @ts-ignore
    return this.Db.bulkCreate(data);
  }

  public handleGetAllAndFilterByIncludes(
    filter: FilterPayload,
    includes?: Includeable | Array<Includeable>
  ) {
    let { _limit, _page, _order, name_query, name_order, name_like, ...others } = filter;

    return this.Db.findAndCountAll({
      where: {
        ...others,
        [`${name_query}`]: {
          [name_like ? Op.like : Op.not]: name_like ? `%${name_like}%` : null,
        },
      },
      limit: _limit,
      offset: _limit * _page,
      order: [[`${name_order || 'id'}`, `${_order || 'ASC'}`]],
      include: includes,
    });
  }

  public handleUpdate<T>(id: number, data: T) {
    return this.Db.update({ ...data }, { where: { id: id } });
  }

  public handleDelete(id: number) {
    return this.Db.destroy({ where: { id } });
  }

  public handleGetById(id: number) {
    return this.Db.findByPk(id);
  }

  public getDb() {
    return this.Db;
  }

  public hasOneDayPassed(dateInput: string) {
    const date = new Date().toLocaleDateString();

    if (dateInput === date) return false;

    return true;
  }
}
