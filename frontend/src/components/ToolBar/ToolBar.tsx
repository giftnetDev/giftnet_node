import React, {useState} from 'react';

// 1. 툴바에 들어갈 개별 필드들의 규격을 타입으로 정의

export interface ToolBarFieldConfig{
    name: string;
    label: string;
    type: 'text' | 'select' | 'date' | 'radio' | 'check' ;
    placeholder?: string;
    options?: [string, string][];
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

interface ToolBarProps{
    title:string;
    fields: ToolBarFieldConfig[];
    initialValues: Record<string, any>; //초기 설정값
    onSearch: (values: Record<string, any>) => void;
    onReset: (values: Record<string, any>) => void;
}

export const ToolBar: React.FC<ToolBarProps> =({
    title,
    fields,
    initialValues,
    onSearch,
    onReset
}) =>{
    const [values, setValues] = useState<Record<string, any>>(initialValues);
    const handleChange = (name: string, value: any) =>{
        setValues(prev => ({...prev, [name]: value}));
    };

    const handleSearchClick = () =>{
        const trimmedValues = Object.keys(values).reduce((acc, key) =>{
            acc[key] = typeof values[key] === 'string' ? values[key].trim() : values[key];
            return acc;
        }, {} as Record<string, any>);

        onSearch(trimmedValues);
    };

    const handleResetClick = () =>{
        setValues(initialValues);
        onReset(initialValues);
    };

    return(
        <section className="erp-generic-toolbar" style={styles.toolbar}>
            <div style={styles.header}>
                <div style={styles.title}>{title}</div>
            </div>
            <div style={styles.body}>
                <div style={styles.fieldsContainer}>
                    {/* 💡 핵심: 설정 데이터 배열을 순회(Loop)하며 알맞은 UI 컴포넌트를 동적으로 렌더링 */}
                    {fields.map((field) =>(
                        <label key={field.name} style={styles.fieldLabel}>
                            <span style={styles.labelText}>{field.label}</span>

                            {/* 1. 일반 텍스트 입력창일 때 */}
                            {field.type === 'text' && (
                                <input
                                    type="text"
                                    placeholder={field.placeholder}
                                    value={values[field.name] || ''}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                    style={styles.control}
                                    />
                            )}
                            {/*2. 셀렉트 박스일 때*/}
                            {field.type === 'select' && (
                                <select
                                    value={values[field.name] || ''}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                    style={styles.control}
                                    >
                                    {field.options?.map(([val, lbl]) =>(
                                        <option key={val} value={val}>{lbl}</option>
                                    ))}
                                </select>
                            )}

                            {/* 3. 날짜 선택창일 때 */}
                            {field.type === 'date' && (
                                <input
                                    type="date"
                                    value={values[field.name] || ''}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                    style={styles.control}
                                    />
                            )}

                            {/* 4. 라디오 버튼 그룹일때*/}
                            {field.type === 'radio' &&(
                                <div style={styles.radioGroup}>
                                    {field.options?.map(([val, lbl])=>(
                                        <label key={val} style={styles.radioLabel}>
                                            <input
                                                type="radio"
                                                name={field.name}
                                                value={val}
                                                checked={values[field.name] === val}
                                                onChange={() => handleChange(field.name, val)}
                                                />
                                            {lbl}
                                        </label>
                                        ))}
                                </div>
                            )}
                        </label>
                        ))
                    }

                    {/* 공통 버튼 영역 */}
                    <div style={styles.actions}>
                        <button onClick={handleSearchClick} style={{...styles.btn, ...styles.btnPrimary}}>검색</button>
                        <button onClick={handleResetClick} style={{...styles.btn, ...styles.btnPrimary}}>초기화</button>
                    </div>
                </div>
            </div>
        </section>

    );
};

const styles = {
    toolbar: { background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '20px', fontFamily: 'sans-serif' },
    header: { borderBottom: '1px solid #f1f5f9', paddingBottom: '10px', marginBottom: '15px' },
    title: { fontSize: '1.1rem', fontWeight: 'bold', color: '#1e293b' },
    body: { display: 'flex', flexDirection: 'column' as const },
    fieldsContainer: { display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', gap: '20px' },
    fieldLabel: { display: 'flex', alignItems: 'center', gap: '8px' },
    labelText: { fontSize: '0.85rem', fontWeight: 'bold', color: '#475569' },
    control: { padding: '6px 10px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.9rem', outline: 'none' },
    radioGroup: { display: 'flex', gap: '10px', fontSize: '0.9rem' },
    radioLabel: { display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' },
    actions: { display: 'flex', gap: '6px', marginLeft: 'auto' },
    btn: { padding: '6px 14px', border: 'none', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer' },
    btnPrimary: { background: '#2563eb', color: '#ffffff' },
    btnSecondary: { background: '#e2e8f0', color: '#475569' }
};