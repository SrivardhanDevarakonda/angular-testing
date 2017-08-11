import { display } from './display'

describe('display',()=>{
    it('should display name',()=>{
        expect(display('srivardhan')).toContain('srivardhan')
    })
})