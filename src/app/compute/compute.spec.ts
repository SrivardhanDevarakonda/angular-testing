import { compute } from './compute'

describe('compute',()=>{
    it('should return 0 when number < 1',()=>{
        const result = compute(-1)
        expect(result).toBe(0)
    })
    
    it('should increement value when number > 1',()=>{
        const result = compute(1)
        expect(result).toBe(2)
    })
    
})