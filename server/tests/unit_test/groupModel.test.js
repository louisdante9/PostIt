import chai from 'chai';
import models from '../../models';
import groupData from '../helpers/group.helper';

const should = chai.should();

const { group } = groupData;

describe('Group model', () => {
  it('should create a group', (done) => {
    models.Group.create(group.demoGroup).then((createdGroup) => {
      createdGroup.name.should.equal(group.demoGroup.name);
      createdGroup.description.should.equal(group.demoGroup.description);
      done();
    });
  });
  it('should not create a group if group name is a duplicate', (done) => {
    models.Group.create(group.demoGroup2).then().catch((error) => {
      error.errors[0].message.should.equal('Name can not be empty');
    });
    done();
  });
  it('should not create a group if group name is empty', (done) => {
    models.Group.create(group.demoGroup3).then().catch((error) => {
      error.errors[0].message.should.equal('Name can not be empty');
      done();
    });
  });
  it('should not create a group if group description is empty', (done) => {
    models.Group.create(group.demoGroup4).then().catch((error) => {
      error.errors[0].message.should.equal('description can not be empty');
      done();
    });
  });
});