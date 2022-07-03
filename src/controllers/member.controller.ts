import { Request, Response } from 'express';
import { db } from '../config/db';
import log from '../logger';

export async function getAllMember(req: Request, res: Response) {
  try {
    const members = await db.Member.findAll();
    res.status(200).json({ error: false, message: 'GET ALL SUCCESSFULLY!!!', data: members });
  } catch (error) {
    res.status(500).json({ error: true, message: 'ERROR FROM SERVER!!!' });
    log.error(error);
  }
}

export async function deleteMember(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) return res.status(404).json({ error: true, message: 'Missing parameter!!!' });

    const member = await db.Member.findByPk(id);

    if (!member) return res.status(400).json({ error: true, message: 'Member not found!!!' });

    res.status(200).json({ error: false, message: 'Delete Success', data: member });
  } catch (error) {
    res.status(500).json({ error: true, message: 'ERROR FROM SERVER!!!' });
    log.error(error);
  }
}
